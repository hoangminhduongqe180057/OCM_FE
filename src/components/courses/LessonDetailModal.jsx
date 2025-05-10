import { Box, Paper, Typography, IconButton, CircularProgress, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useState } from "react";

function LessonDetailModal({ open, onClose, lesson }) {
  const [videoLoading, setVideoLoading] = useState(true);
  const [documentLoading, setDocumentLoading] = useState(true);

  if (!open || !lesson) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date)) return "N/A";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const isPDF = lesson.documentUrl && lesson.documentUrl.toLowerCase().endsWith(".pdf");

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", md: "80vw" },
            maxHeight: { xs: "95vh", md: "95vh" },
            overflowY: "auto", // Cho phép cuộn toàn bộ nội dung
            p: 3,
            borderRadius: 2,
            backgroundColor: "#FFFFFF",
            pointerEvents: "auto",
            zIndex: 1301,
            elevation: 0,
            transition: "none",
            "&:hover": {
              backgroundColor: "#FFFFFF",
              boxShadow: "none",
              transform: "translate(-50%, -50%)",
            },
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#6D8199",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#14375F",
            },
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", top: 8, right: 8, color: "#14375F", "&:hover": { color: "#6D8199" } }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ color: "#14375F" }}>
              Chi tiết bài học: {lesson.title}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ color: "#14375F" }}>
              <strong>Thứ tự:</strong> {lesson.order}
            </Typography>
            <Typography variant="body1" sx={{ color: "#14375F" }}>
              <strong>Ngày tạo:</strong> {formatDate(lesson.createdAt)}
            </Typography>
            <Typography variant="body1" sx={{ color: "#14375F" }}>
              <strong>Người tạo:</strong> {lesson.createdBy || "Không xác định"}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ color: "#14375F", mb: 1 }}>
              Video bài giảng
            </Typography>
            {lesson.videoUrl ? (
              <video
                controls
                style={{ 
                  maxWidth: "800px", // Thu nhỏ kích thước video
                  width: "100%", // Đảm bảo responsive
                  aspectRatio: "16/9",
                  borderRadius: 8,
                  display: "block", // Căn giữa
                  margin: "0 auto", // Căn giữa ngang
                }}
                onCanPlay={() => setVideoLoading(false)}
              >
                <source src={lesson.videoUrl} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video.
              </video>
            ) : (
              <Typography sx={{ color: "#6D8199", mb: 3 }}>
                Không có video bài giảng.
              </Typography>
            )}

            <Typography variant="h6" sx={{ color: "#14375F", mt: 3, mb: 1 }}>
              Tài liệu bài giảng
            </Typography>
            {lesson.documentUrl ? (
              isPDF ? (
                <Box>
                  <object
                    data={lesson.documentUrl}
                    type="application/pdf"
                    width="100%"
                    style={{ height: "80vh", border: "none", borderRadius: 8 }}
                  >
                    <Typography sx={{ color: "#6D8199" }}>
                      Trình duyệt của bạn không hỗ trợ xem PDF. Vui lòng{" "}
                      <a href={lesson.documentUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#E24943" }}>
                        tải xuống
                      </a>{" "}
                      để xem.
                    </Typography>
                  </object>
                  <Box sx={{ mt: 2, textAlign: "right" }}>
                    <Button
                      variant="outlined"
                      href={lesson.documentUrl}
                      target="_blank"
                      sx={{ color: "#E24943", borderColor: "#E24943", "&:hover": { borderColor: "#E0312E" } }}
                    >
                      Xem trực tuyến
                    </Button>
                    <Button
                      variant="outlined"
                      href={lesson.documentUrl}
                      download
                      sx={{ ml: 2, color: "#E24943", borderColor: "#E24943", "&:hover": { borderColor: "#E0312E" } }}
                    >
                      Tải xuống
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ color: "#14375F", mb: 1 }}>
                    <a
                      href={lesson.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#E24943", textDecoration: "none" }}
                    >
                      Tải tài liệu
                    </a>
                  </Typography>
                </Box>
              )
            ) : (
              <Typography sx={{ color: "#6D8199", mb: 3 }}>
                Không có tài liệu bài giảng.
              </Typography>
            )}
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default LessonDetailModal;