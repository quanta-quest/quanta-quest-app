import {
  GetAppDocuments,
  GetAppSourceList,
} from "@/wailsjs/go/controller/AppSource";
import { create } from "zustand";

interface DocumentsResponse {
  total: number;
  items: any[];
  page: number;
  pageSize: number;
}

interface AppStoreState {
  count: number;
  currentPage: string;
  appKey: string;

  appSourceList: any[];

  // app document list
  appDocumentTablePage: number;
  appDocumentTablePageSize: number;
  appDocumentTableSearch: string;
  appDocumentTableLoading: boolean;
  appDocumentTableData?: DocumentsResponse | null;
}

interface AppStoreAction {
  setCount: (count: number) => void;
  setCurrentPage: (page: string) => void;
  setAppDocumentTablePage: (page: number) => void;
  setAppDocumentTablePageSize: (size: number) => void;
  setAppDocumentTableSearch: (search: string) => void;
  setAppDocumentTableLoading: (loading: boolean) => void;
  fetchAppDocumentTableData: () => Promise<any | null>;
  refreshAppDocumentTableData: () => Promise<any | null>;

  fetchAppSourceList: () => Promise<any[]>;
}

export const useAppStore = create<AppStoreState & AppStoreAction>(
  (set, get) => ({
    count: 0,
    currentPage: "apps",
    appKey: "",
    appSourceList: [],
    appDocumentTablePage: 1,
    appDocumentTablePageSize: 10,
    appDocumentTableSearch: "",
    appDocumentTableLoading: false,
    appDocumentTableData: null,
    setCount: (count) => {
      set((state) => ({ ...state, count: count }));
    },
    setCurrentPage: (page) => {
      //get appkey
      var pageSplit = page.split("/");
      if (pageSplit.length > 1) {
        if (pageSplit[0] === "apps") {
          set((state) => ({
            ...state,
            currentPage: page,
            appKey: pageSplit[1],
          }));
          return;
        }
      }
      set((state) => ({ ...state, currentPage: page }));
    },
    fetchAppSourceList: async () => {
      const res = await GetAppSourceList();
      // console.log(res);
      set((state) => ({ ...state, appSourceList: res.data }));
      return res.data;
    },
    setAppDocumentTablePage: (page) => {
      console.log("setAppDocumentTablePage", page);
      set((state) => ({ ...state, appDocumentTablePage: page }));
    },
    setAppDocumentTablePageSize: (size) => {
      set((state) => ({ ...state, appDocumentTablePageSize: size }));
    },
    setAppDocumentTableSearch: (search) => {
      set((state) => ({ ...state, appDocumentTableSearch: search }));
    },
    setAppDocumentTableLoading: (loading) => {
      set((state) => ({ ...state, appDocumentTableLoading: loading }));
    },
    fetchAppDocumentTableData: async () => {
      const res = await GetAppDocuments({
        page: get().appDocumentTablePage,
        pageSize: get().appDocumentTablePageSize,
        appKey: get().appKey,
        search: get().appDocumentTableSearch,
      });
      set((state) => ({ ...state, appDocumentTableData: res.data }));
      return res;
    },
    refreshAppDocumentTableData: async () => {
      if (get().appKey === "") {
        return;
      }
      set((state) => ({
        ...state,
        appDocumentTablePage: 1,
        appDocumentTableSearch: "",
      }));

      await get().fetchAppDocumentTableData();
    },
    // bears: 0,
    // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 }),
    // updateBears: (newBears) => set({ bears: newBears })
  }),
);
