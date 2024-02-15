import {create} from 'zustand';

interface Store {
	hostUrl: string|null;
	setHostUrl: (report: string) => void;
}

const VerifyNworx=create<Store>((set) => ({
	hostUrl: process.env.NEXT_PUBLIC_ENVOY_CENTRAL_BASE_URL||null,
	setHostUrl: (report) => set((state) => ({hostUrl: report})),
}));

export default VerifyNworx;
