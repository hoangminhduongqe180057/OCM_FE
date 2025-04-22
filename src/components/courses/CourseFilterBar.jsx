import { useState } from "react";
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const instructors = [
  { id: "USR_00000001", name: "Instructor 1" },
  { id: "USR_00000002", name: "Instructor 2" },
];
const categories = [
  { id: "CAT_00000001", name: "Programming" },
  { id: "CAT_00000002", name: "Design" },
];
const statuses = ["Draft", "Published"];

function CourseFilterBar({ search, setSearch, filterInstructor, setFilterInstructor, filterCategory, setFilterCategory, filterStatus, setFilterStatus, maxWidth }) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3, maxWidth: maxWidth, transition: "max-width 0.3s ease" }}>
      <TextField
        label="Tìm kiếm theo tiêu đề"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          width: 300,
          "& .MuiInputBase-input": { color: "#14375F" },
          "& .MuiInputLabel-root": { color: "#14375F" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#6D8199" },
            "&:hover fieldset": { borderColor: "#14375F" },
          },
        }}
      />
      <FormControl sx={{ width: 200 }}>
        <InputLabel sx={{ color: "#14375F" }}>Giảng viên</InputLabel>
        <Select
          value={filterInstructor}
          onChange={(e) => setFilterInstructor(e.target.value)}
          label="Giảng viên"
          sx={{
            "& .MuiSelect-select": { color: "#14375F" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6D8199" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#14375F" },
          }}
        >
          <MenuItem value="">Tất cả</MenuItem>
          {instructors.map((instructor) => (
            <MenuItem key={instructor.id} value={instructor.id}>
              {instructor.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: 200 }}>
        <InputLabel sx={{ color: "#14375F" }}>Danh mục</InputLabel>
        <Select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          label="Danh mục"
          sx={{
            "& .MuiSelect-select": { color: "#14375F" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6D8199" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#14375F" },
          }}
        >
          <MenuItem value="">Tất cả</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: 200 }}>
        <InputLabel sx={{ color: "#14375F" }}>Trạng thái</InputLabel>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          label="Trạng thái"
          sx={{
            "& .MuiSelect-select": { color: "#14375F" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6D8199" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#14375F" },
          }}
        >
          <MenuItem value="">Tất cả</MenuItem>
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default CourseFilterBar;