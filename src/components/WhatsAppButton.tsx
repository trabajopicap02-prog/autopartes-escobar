import { whatsappLink } from "@/lib/constants";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hola, quiero más información sobre sus repuestos.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-105"
      aria-label="Escribir por WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.24-1.37a9.9 9.9 0 0 0 4.8 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.24c-.25.7-1.24 1.28-2.02 1.44-.55.11-1.26.2-3.66-.79-2.98-1.23-4.9-4.24-5.05-4.44-.15-.2-1.2-1.6-1.2-3.05 0-1.45.75-2.16 1.03-2.46.27-.29.6-.36.8-.36.2 0 .4 0 .57.01.18.01.43-.07.68.52.25.6.85 2.06.92 2.21.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.07.13.07.72-.18 1.42Z" />
      </svg>
    </a>
  );
}
