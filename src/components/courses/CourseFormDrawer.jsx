// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import {
//   Drawer,
//   Box,
//   Typography,
//   Button,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Alert,
//   CircularProgress,
// } from "@mui/material";

// const instructors = [
//   { id: "USR_00000001", name: "Instructor 1" },
//   { id: "USR_00000002", name: "Instructor 2" },
// ];
// const categories = [
//   { id: "CAT_00000001", name: "Programming" },
//   { id: "CAT_00000002", name: "Design" },
// ];

// const schema = yup.object({
//   title: yup.string().required("Tiêu đề là bắt buộc"),
//   description: yup.string().required("Mô tả là bắt buộc"),
//   instructorId: yup.string().required("Vui lòng chọn giảng viên"),
//   categoryId: yup.string().required("Vui lòng chọn danh mục"),
// }).required();

// function CourseFormDrawer({ open, onClose, onSubmit, createStatus, createError }) {
//   const { control, handleSubmit, reset, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       title: "",
//       description: "",
//       instructorId: "",
//       categoryId: "",
//     },
//   });

//   const handleFormSubmit = (data) => {
//     onSubmit(data, reset);
//   };

//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       <Box sx={{ width: 400, p: 3, backgroundColor: "#FFFFFF" }}>
//         <Typography variant="h6" sx={{ color: "#14375F", mb: 2 }}>
//           Thêm khóa học mới
//         </Typography>
//         {createStatus === "failed" && (
//           <Alert severity="error" sx={{ mb: 2, color: "#E0312E" }}>
//             {createError || "Không thể tạo khóa học"}
//           </Alert>
//         )}
//         <form onSubmit={handleSubmit(handleFormSubmit)}>
//           <Controller
//             name="title"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Tiêu đề"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.title}
//                 helperText={errors.title?.message}
//                 sx={{
//                   "& .MuiInputBase-input": { color: "#14375F" },
//                   "& .MuiInputLabel-root": { color: "#14375F" },
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": { borderColor: "#6D8199" },
//                     "&:hover fieldset": { borderColor: "#14375F" },
//                   },
//                 }}
//               />
//             )}
//           />
//           <Controller
//             name="description"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Mô tả"
//                 fullWidth
//                 margin="normal"
//                 multiline
//                 rows={4}
//                 error={!!errors.description}
//                 helperText={errors.description?.message}
//                 sx={{
//                   "& .MuiInputBase-input": { color: "#14375F" },
//                   "& .MuiInputLabel-root": { color: "#14375F" },
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": { borderColor: "#6D8199" },
//                     "&:hover fieldset": { borderColor: "#14375F" },
//                   },
//                 }}
//               />
//             )}
//           />
//           <FormControl fullWidth margin="normal" error={!!errors.instructorId}>
//             <InputLabel sx={{ color: "#14375F" }}>Giảng viên</InputLabel>
//             <Controller
//               name="instructorId"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   label="Giảng viên"
//                   sx={{
//                     "& .MuiSelect-select": { color: "#14375F" },
//                     "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6D8199" },
//                     "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#14375F" },
//                   }}
//                 >
//                   {instructors.map((instructor) => (
//                     <MenuItem key={instructor.id} value={instructor.id}>
//                       {instructor.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               )}
//             />
//             {errors.instructorId && (
//               <Typography variant="caption" color="#E0312E">
//                 {errors.instructorId.message}
//               </Typography>
//             )}
//           </FormControl>
//           <FormControl fullWidth margin="normal" error={!!errors.categoryId}>
//             <InputLabel sx={{ color: "#14375F" }}>Danh mục</InputLabel>
//             <Controller
//               name="categoryId"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   label="Danh mục"
//                   sx={{
//                     "& .MuiSelect-select": { color: "#14375F" },
//                     "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6D8199" },
//                     "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#14375F" },
//                   }}
//                 >
//                   {categories.map((category) => (
//                     <MenuItem key={category.id} value={category.id}>
//                       {category.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               )}
//             />
//             {errors.categoryId && (
//               <Typography variant="caption" color="#E0312E">
//                 {errors.categoryId.message}
//               </Typography>
//             )}
//           </FormControl>
//           <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
//             <Button
//               onClick={onClose}
//               sx={{
//                 color: "#6D8199",
//                 "&:hover": { color: "#14375F" },
//               }}
//             >
//               Hủy
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{
//                 bgcolor: "#E24943",
//                 "&:hover": { bgcolor: "#E0312E" },
//                 color: "#FFFFFF",
//               }}
//               disabled={createStatus === "loading"}
//             >
//               {createStatus === "loading" ? <CircularProgress size={24} /> : "Lưu"}
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Drawer>
//   );
// }

// export default CourseFormDrawer;

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Drawer,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";

const instructors = [
  { id: "USR_00000001", name: "Instructor 1" },
  { id: "USR_00000002", name: "Instructor 2" },
];
const categories = [
  { id: "CAT_00000001", name: "Programming" },
  { id: "CAT_00000002", name: "Design" },
];

const schema = yup.object({
  title: yup.string().required("Tiêu đề là bắt buộc"),
  description: yup.string().required("Mô tả là bắt buộc"),
  instructorId: yup.string().required("Vui lòng chọn giảng viên"),
  categoryId: yup.string().required("Vui lòng chọn danh mục"),
}).required();

function CourseFormDrawer({ open, onClose, onSubmit, createStatus, createError, defaultValues }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      instructorId: "",
      categoryId: "",
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data, reset);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3, backgroundColor: "#FFFFFF" }}>
        <Typography variant="h6" sx={{ color: "#14375F", mb: 2 }}>
          {defaultValues ? "Chỉnh sửa khóa học" : "Thêm khóa học mới"}
        </Typography>
        {createStatus === "failed" && (
          <Alert severity="error" sx={{ mb: 2, color: "#E0312E" }}>
            {createError || "Không thể lưu khóa học"}
          </Alert>
        )}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Tiêu đề"
                fullWidth
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
                sx={{
                  "& .MuiInputBase-input": { color: "#14375F" },
                  "& .MuiInputLabel-root": { color: "#14375F" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#6D8199" },
                    "&:hover fieldset": { borderColor: "#14375F" },
                  },
                }}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Mô tả"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={{
                  "& .MuiInputBase-input": { color: "#14375F" },
                  "& .MuiInputLabel-root": { color: "#14375F" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#6D8199" },
                    "&:hover fieldset": { borderColor: "#14375F" },
                  },
                }}
              />
            )}
          />
          <FormControl fullWidth margin="normal" error={!!errors.instructorId}>
            <InputLabel sx={{ color: "#14375F" }}>Giảng viên</InputLabel>
            <Controller
              name="instructorId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Giảng viên"
                  sx={{
                    "& .MuiSelect-select": { color: "#14375F" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6D8199" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#14375F" },
                  }}
                >
                  {instructors.map((instructor) => (
                    <MenuItem key={instructor.id} value={instructor.id}>
                      {instructor.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.instructorId && (
              <Typography variant="caption" color="#E0312E">
                {errors.instructorId.message}
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!errors.categoryId}>
            <InputLabel sx={{ color: "#14375F" }}>Danh mục</InputLabel>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Danh mục"
                  sx={{
                    "& .MuiSelect-select": { color: "#14375F" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6D8199" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#14375F" },
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.categoryId && (
              <Typography variant="caption" color="#E0312E">
                {errors.categoryId.message}
              </Typography>
            )}
          </FormControl>
          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Button
              onClick={onClose}
              sx={{
                color: "#6D8199",
                "&:hover": { color: "#14375F" },
              }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#E24943",
                "&:hover": { bgcolor: "#E0312E" },
                color: "#FFFFFF",
              }}
              disabled={createStatus === "loading"}
            >
              {createStatus === "loading" ? <CircularProgress size={24} /> : "Lưu"}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
}

export default CourseFormDrawer;