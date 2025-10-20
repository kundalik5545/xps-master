// "use client";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { Textarea } from "@/components/ui/textarea";
// import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
// import { useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// // Server actions (implement in actions/ feature folder and use Prisma client from lib/generated/prisma/)
// import {
//   createXpsMenuDescription,
//   deleteXpsMenuDescription,
//   updateXpsMenuDescription,
// } from "@/actions/xps/xpsMenu";
// //
// const initialForm = { id: null, menuId: "", description: "" };

// const XpsMenuDesc = ({ XpsMenuDescData }) => {
//   const [saving, setSaving] = useState(false);
//   const [openForm, setOpenForm] = useState(false);
//   const [form, setForm] = useState(initialForm);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [toDelete, setToDelete] = useState(null);
//   const isEdit = useMemo(() => !!form.id, [form.id]);
//   const router = useRouter();

//   // guard against undefined data
//   const xpsMenuDesc = XpsMenuDescData?.data?.menuDescriptions ?? [];

//   const onNew = () => {
//     setForm(initialForm);
//     setOpenForm(true);
//   };

//   const onEdit = (item) => {
//     setForm({
//       id: item.id,
//       menuId: item.menuId ?? "",
//       description: item.description ?? "",
//     });
//     setOpenForm(true);
//   };

//   const onDelete = (item) => {
//     setToDelete(item);
//     setOpenDelete(true);
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     if (!form.menuId?.trim()) return;
//     setSaving(true);
//     try {
//       if (isEdit) {
//         await updateXpsMenuDescription(form.id, {
//           menuId: form.menuId.trim(),
//           description: form.description?.trim() ?? "",
//         });
//       } else {
//         await createXpsMenuDescription({
//           menuId: form.menuId.trim(),
//           description: form.description?.trim() ?? "",
//         });
//       }
//       setOpenForm(false);
//       setForm(initialForm);
//       router.refresh();
//     } finally {
//       setSaving(false);
//     }
//   };

//   const confirmDelete = async () => {
//     if (!toDelete) return;
//     setSaving(true);
//     try {
//       await deleteXpsMenuDescription(toDelete.id);
//       setOpenDelete(false);
//       setToDelete(null);
//       router.refresh();
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="space-y-4 mt-5">
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-semibold">XPS Menu Descriptions</h2>
//         <Button onClick={onNew}>
//           <Plus className="mr-2 h-4 w-4" /> New
//         </Button>
//       </div>

//       {xpsMenuDesc.length === 0 ? (
//         <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
//           No descriptions found. Create one to get started.
//         </div>
//       ) : (
//         <>
//           {xpsMenuDesc.map((item) => (
//             <div className="flex items-center justify-between text-sm text-muted-foreground whitespace-pre-wrap">
//               <div className="">{item.description || "—"}</div>

//               <div className="flex shrink-0 items-center gap-2">
//                 <Button
//                   variant="secondary"
//                   size="icon"
//                   onClick={() => onEdit(item)}
//                 >
//                   <Pencil className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   size="icon"
//                   onClick={() => onDelete(item)}
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </>
//       )}

//       <Dialog open={openForm} onOpenChange={setOpenForm}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               {isEdit ? "Edit Description" : "New Description"}
//             </DialogTitle>
//           </DialogHeader>

//           <form onSubmit={submit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="menuId">Menu Id</Label>
//               <Input
//                 id="menuId"
//                 value={form.menuId}
//                 onChange={(e) =>
//                   setForm((f) => ({ ...f, menuId: e.target.value }))
//                 }
//                 placeholder="Menu Id is"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 value={form.description}
//                 onChange={(e) =>
//                   setForm((f) => ({ ...f, description: e.target.value }))
//                 }
//                 placeholder="Describe the menu purpose..."
//                 rows={6}
//               />
//             </div>

//             <DialogFooter>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setOpenForm(false)}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={saving}>
//                 {saving ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
//                   </>
//                 ) : isEdit ? (
//                   "Update"
//                 ) : (
//                   "Create"
//                 )}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete this description?</AlertDialogTitle>
//           </AlertDialogHeader>

//           <p className="text-sm text-muted-foreground">
//             This action cannot be undone. The description for menu "
//             {toDelete?.menuId}" will be permanently removed.
//           </p>

//           <AlertDialogFooter>
//             <AlertDialogCancel disabled={saving}>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//               onClick={confirmDelete}
//               disabled={saving}
//             >
//               {saving ? (
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               ) : null}
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default XpsMenuDesc;
