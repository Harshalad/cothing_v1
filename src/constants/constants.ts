// export const NWORX_GRPC_HOSTNAME =
//   "https://envoy-proxy-ji7zjwsata-uc.a.run.app";

// export const NWORX_BASE_URL =
//   "https://us-central1-nworx4central-dev.cloudfunctions.net/";

// export const CLOUD_FUNCTIONS_BASE_URL = `https://us-central1-nworx4dev.cloudfunctions.net/api/`;
export const GOAL_STATUS: any = {
  "ADDED": "Added",
  "IN_PROGRESS": "In Progress",
  "COMPLETED": "Completed",
  "SENT_FOR_APPROVAL": "Sent for approval",
  "ALIGNED": "In Progress",
  "ASSIGNED": "Assigned"
}
export const NWORX_GRPC_HTTP_HOSTNAME = process.env.NEXT_PUBLIC_NWORX_HTTP_BASE_URL || ""
//export let NWORX_GRPC_HOSTNAME=process.env.NEXT_PUBLIC_ENVOY_BASE_URL||"";

export let NWORX_GRPC_HOSTNAME: any = process.env.NEXT_PUBLIC_ENVOY_BASE_URL;
export function getNWORX_GRPC_HOSTNAME (): string {
  return NWORX_GRPC_HOSTNAME;
}

export function setingNWORX_GRPC_HOSTNAME ( value: string ): void {
  NWORX_GRPC_HOSTNAME = value;
}


// export const NWORX_BASE_URL = process.env.NEXT_PUBLIC_NWORX_BASE_URL || "";

export const CLOUD_FUNCTIONS_BASE_URL =
  process.env.NEXT_PUBLIC_CLOUD_FUNCTIONS_BASE_URL || "";

export const MRA_BASE_URL = process.env.NEXT_PUBLIC_MRA_BASE_URL || "";
export const ASSESSMENT_BASE_URL =
  process.env.NEXT_PUBLIC_ASSESSMENT_BASE_URL || "";

export const options = { day: '2-digit', month: 'short', year: 'numeric' };
