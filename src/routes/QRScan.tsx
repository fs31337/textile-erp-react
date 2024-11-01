import { QRCodeReader } from "../pages/QRCodeReader";
import { RouteType } from "../types/routes";

export const qrScanRoutes: RouteType[] = [
  { path: "/lector-qr", element: <QRCodeReader /> },
];
