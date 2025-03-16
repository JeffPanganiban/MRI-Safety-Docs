import { Device } from "@/types/device";
import DeviceCard from "./DeviceCard";

interface DeviceListProps {
  devices: Device[];
  title?: string;
  emptyMessage?: string | React.ReactNode;
  className?: string;
}

export default function DeviceList({
  devices,
  title,
  emptyMessage = "No devices found" as string | React.ReactNode,
  className = "",
}: DeviceListProps) {
  return (
    <div className={className}>
      {title && <h2 className="text-2xl font-semibold mb-6">{title}</h2>}

      {devices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              id={device.id}
              name={device.name}
              manufacturer={device.manufacturer?.name || ""}
              safetyStatus={device.safetyStatus}
              imageUrl={device.imageUrl}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}
