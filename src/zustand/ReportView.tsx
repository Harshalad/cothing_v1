import { create } from 'zustand';

type Store = {
  selectedReport: any;
  setSelectedReport: (report: any) => void;
};

const ReportView = create<Store>((set) => ({
  selectedReport: {},
  setSelectedReport: (report) => set((state) => ({ selectedReport: report })),
}));

export default ReportView;
