import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ExportModalProps {
  embedCode: string;
  handleExportClick: () => void;
}

const ExportModal = ({ embedCode, handleExportClick }: ExportModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mb-4 mt-8" onClick={handleExportClick}>
          Export Design
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Export Code</DialogTitle>
          <DialogDescription>
            Copy and paste the code below into your project to embed the
            element.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[200px] overflow-auto">
          <Textarea
            value={embedCode}
            className="w-full bg-input resize-none focus-visible:ring-0"
            readOnly
          />
        </div>
        <Button
          className="w-full mt-2"
          onClick={() => {
            navigator.clipboard.writeText(embedCode);
          }}
        >
          Copy
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
