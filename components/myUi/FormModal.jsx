import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const FormModal = ({ isDialogOpen, setIsDialogOpen, isEditing, myForm }) => {
  return (
    <div className="form__modal">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className={
            "max-w-[350px] md:max-w-[850px] max-h-[90vh] overflow-y-auto scrollbar-hide"
          }
        >
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit" : "Create New"}</DialogTitle>
            <DialogDescription>
              Please fill out the form below to{" "}
              {isEditing ? "update the data." : "create a new entry."}
            </DialogDescription>
          </DialogHeader>
          <div>{myForm}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormModal;
