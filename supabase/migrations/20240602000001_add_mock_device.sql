-- Insert a mock device with detailed MRI safety information
INSERT INTO devices (
  name, 
  model_number, 
  manufacturer_id, 
  category_id, 
  safety_status, 
  conditions, 
  field_strength, 
  additional_info, 
  documentation_url, 
  image_url
) VALUES (
  'Neuro-Stim X1 Implantable Neurostimulator', 
  'NS-X1-2023', 
  1, 
  1, 
  'MR Conditional', 
  'Patient must be positioned in supine position only. The MRI scan must be performed with the following parameters:
- Horizontal field, closed bore scanner only
- Static magnetic field of 1.5 Tesla only
- Maximum spatial gradient field of 20 T/m (2,000 gauss/cm)
- Maximum MR system reported whole-body-averaged specific absorption rate (SAR) of 2.0 W/kg in Normal Operating Mode

The device must be programmed to "MRI Safe Mode" prior to scanning. Contact manufacturer for detailed instructions.',
  '1.5T only', 
  'The Neuro-Stim X1 has been tested and shown to be MR Conditional at 1.5 Tesla. The device contains ferromagnetic components that may pose risks if exposed to MRI environments outside the specified conditions. The patient should carry their device ID card at all times and inform all healthcare providers about the implanted device.',
  'https://www.example.com/neurostim-x1-mri-safety',
  'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=800&q=80'
) ON CONFLICT DO NOTHING;

-- Insert another mock device with different safety status
INSERT INTO devices (
  name, 
  model_number, 
  manufacturer_id, 
  category_id, 
  safety_status, 
  conditions, 
  field_strength, 
  additional_info, 
  documentation_url, 
  image_url
) VALUES (
  'CardioRhythm Pacemaker Advanced', 
  'CR-PA-450', 
  2, 
  1, 
  'MR Conditional', 
  'The CardioRhythm Pacemaker Advanced is MR Conditional and can be scanned safely under the following conditions:
- Static magnetic field of 1.5T or 3.0T
- Maximum spatial gradient field of 4,000 gauss/cm (40 T/m)
- Maximum MR system reported, whole body averaged specific absorption rate (SAR) of 2 W/kg (Normal Operating Mode)

The device must be programmed to MRI mode by a qualified cardiologist before the scan. Patient monitoring during MRI is required.',
  '1.5T and 3.0T', 
  'The CardioRhythm Pacemaker Advanced has been designed with MRI compatibility in mind. The device uses specialized shielding and non-ferromagnetic components to minimize risks during MRI procedures. Follow-up device check is recommended within 24 hours after MRI scan.',
  'https://www.example.com/cardiorhythm-pacemaker-mri-safety',
  'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80'
) ON CONFLICT DO NOTHING;

-- Insert a third mock device with MR Unsafe status
INSERT INTO devices (
  name, 
  model_number, 
  manufacturer_id, 
  category_id, 
  safety_status, 
  conditions, 
  field_strength, 
  additional_info, 
  documentation_url, 
  image_url
) VALUES (
  'Legacy Insulin Pump 2000', 
  'LIP-2000', 
  3, 
  2, 
  'MR Unsafe', 
  'This device is MR Unsafe and must be removed before entering the MRI environment. The device contains ferromagnetic components and electronic circuits that may be damaged by the MRI magnetic field and may pose serious risks to the patient if brought into the MRI room.',
  'N/A', 
  'The Legacy Insulin Pump 2000 was manufactured before MRI compatibility standards were established. Patients using this device who require an MRI should consult with their healthcare provider about temporary alternative insulin delivery methods during the MRI procedure.',
  'https://www.example.com/legacy-insulin-pump-safety',
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80'
) ON CONFLICT DO NOTHING;
