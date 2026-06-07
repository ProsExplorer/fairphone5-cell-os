import { CellExplorerLayout } from "@/features/explorer/navigation/CellExplorerLayout";

/**
 * Home — the Cell OS spatial explorer.
 *
 * The long vertical scroll has been replaced with a cellular GUI:
 * a persistent cell cross-section map on the left, a zone content
 * panel on the right. Navigate from the nucleus (innermost) to the
 * membrane (outermost) — exploration of a cell from the inside out.
 */
export default function Home() {
  return <CellExplorerLayout />;
}
