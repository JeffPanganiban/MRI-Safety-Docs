-- Create device categories table
CREATE TABLE IF NOT EXISTS device_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create manufacturers table
CREATE TABLE IF NOT EXISTS manufacturers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  website TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create devices table
CREATE TABLE IF NOT EXISTS devices (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  model_number TEXT,
  manufacturer_id INTEGER REFERENCES manufacturers(id),
  category_id INTEGER REFERENCES device_categories(id),
  safety_status TEXT NOT NULL,
  conditions TEXT,
  field_strength TEXT,
  additional_info TEXT,
  documentation_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create search index for devices
CREATE INDEX IF NOT EXISTS devices_name_idx ON devices USING GIN (to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS devices_model_number_idx ON devices USING GIN (to_tsvector('english', model_number));

-- Enable realtime for all tables
alter publication supabase_realtime add table device_categories;
alter publication supabase_realtime add table manufacturers;
alter publication supabase_realtime add table devices;

-- Insert some sample categories
INSERT INTO device_categories (name, description, icon) VALUES
('Implantable Devices', 'Medical devices implanted within the body', '🫀'),
('External Devices', 'Medical devices used externally on the body', '🔌'),
('Imaging Equipment', 'Equipment used for medical imaging', '📷'),
('Patient Monitors', 'Devices used to monitor patient vital signs', '📊'),
('Surgical Instruments', 'Tools used during surgical procedures', '🔪'),
('Prosthetics', 'Artificial body parts for replacement', '🦿')
ON CONFLICT DO NOTHING;

-- Insert some sample manufacturers
INSERT INTO manufacturers (name, website) VALUES
('Medtronic', 'https://www.medtronic.com'),
('Boston Scientific', 'https://www.bostonscientific.com'),
('Abbott', 'https://www.abbott.com'),
('Philips', 'https://www.philips.com'),
('GE Healthcare', 'https://www.gehealthcare.com'),
('Siemens Healthineers', 'https://www.siemens-healthineers.com')
ON CONFLICT DO NOTHING;

-- Insert some sample devices
INSERT INTO devices (name, model_number, manufacturer_id, category_id, safety_status, conditions, field_strength) VALUES
('Cardiac Pacemaker', 'CP-2000', 1, 1, 'MR Conditional', 'Patient must be positioned in a specific way. Scanning limited to 1.5T.', '1.5T'),
('Insulin Pump', 'IP-500', 3, 1, 'MR Unsafe', 'Must be removed before entering MRI room.', 'N/A'),
('Cochlear Implant', 'CI-100', 2, 1, 'MR Conditional', 'External components must be removed. Internal magnet may need to be removed for certain scans.', '1.5T'),
('MRI Scanner', 'MRI-3000', 5, 3, 'MR Safe', 'N/A', '3T'),
('Patient Monitor', 'PM-200', 4, 4, 'MR Unsafe', 'Must remain outside MRI room.', 'N/A'),
('Orthopedic Implant', 'OI-400', 2, 1, 'MR Safe', 'No known hazards in all MRI environments.', 'All')
ON CONFLICT DO NOTHING;
