"use client";

import { Row } from "@tanstack/react-table";
import { Delete, MoreHorizontal, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";
import { deleteRecipeAction } from "./action";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = recipeSelectSchema.parse(row.original);

  //   console.log({ task: row.original });
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const action = deleteRecipeAction.bind(null, row.getValue("id"));

  const [state, formAction] = useFormState(action, {
    status: "idle",
    message: "",
  });

  useEffect(() => {
    if (state?.status === "success" && state?.message !== "") {
      console.log({ state });
      toast.success(state?.message);
    }
  }, [state]);

  return (
    <>
      <Dialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontal />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem
              onClick={(e) => e.stopPropagation()}
              onSelect={() =>
                router.push(`/dashboard/recipes/${row.getValue("id")}/edit`)
              }
            >
              <Pencil />
              Edit
            </DropdownMenuItem>

            <DialogTrigger asChild>
              <DropdownMenuItem
                className="text-destructive"
                onClick={(e) => e.stopPropagation()}
                onSelect={(e) => e.preventDefault()}
              >
                <Delete />
                Delete
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. You are about to delete the recipe
              <span className="font-bold"> {row.getValue("name")}</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* <DialogCancel>Cancel</DialogCancel> */}

            <Button
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(false);
                setIsAlertOpen(false);
              }}
            >
              Cancel
            </Button>

            <form
              action={formAction}
              onSubmit={() => {
                setIsDropdownOpen(false);
                setIsAlertOpen(false);

                setTimeout(() => {
                  router.refresh();
                }, 100);
              }}
            >
              <Button
                type="submit"
                variant="destructive"
                onClick={(e) => e.stopPropagation()}
              >
                Delete
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
