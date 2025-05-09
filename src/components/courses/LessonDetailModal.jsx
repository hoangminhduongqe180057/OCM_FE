import { Box, Paper, Typography, IconButton, CircularProgress } from "@mui/material";
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <Paper
          sx={{
            width: { xs: "90%", md: 800 },
            maxHeight: "90vh",
            overflowY: "auto",
            p: 3,
            borderRadius: 2,
            backgroundColor: "#FFFFFF",
            position: "relative",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#14375F",
              "&:hover": { color: "#6D8199" },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" sx={{ color: "#14375F", mb: 2 }}>
            Chi tiết bài học: {lesson.title}
          </Typography>

          <Typography variant="body1" sx={{ color: "#14375F", mb: 1 }}>
            <strong>Thứ tự:</strong> {lesson.order}
          </Typography>
          <Typography variant="body1" sx={{ color: "#14375F", mb: 1 }}>
            <strong>Ngày tạo:</strong> {formatDate(lesson.createdAt)}
          </Typography>
          <Typography variant="body1" sx={{ color: "#14375F", mb: 2 }}>
            <strong>Người tạo:</strong> {lesson.createdBy || "Không xác định"}
          </Typography>

          <Typography variant="h6" sx={{ color: "#14375F", mb: 1 }}>
            Video bài giảng
          </Typography>
          {lesson.videoUrl ? (
            <Box sx={{ mb: 3, position: "relative" }}>
              {videoLoading && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <CircularProgress sx={{ color: "#14375F" }} />
                </Box>
              )}
              <video
                controls
                width="100%"
                style={{ maxHeight: 400, borderRadius: 8 }}
                onCanPlay={() => setVideoLoading(false)}
              >
                <source src={lesson.videoUrl} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video.
              </video>
            </Box>
          ) : (
            <Typography sx={{ color: "#6D8199", mb: 3 }}>
              Không có video bài giảng.
            </Typography>
          )}

          <Typography variant="h6" sx={{ color: "#14375F", mb: 1 }}>
            Tài liệu bài giảng
          </Typography>
          {lesson.documentUrl ? (
            isPDF ? (
              <Box sx={{ mb: 3, position: "relative" }}>
                {documentLoading && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <CircularProgress sx={{ color: "#14375F" }} />
                  </Box>
                )}
                <iframe
                  src={lesson.documentUrl}
                  width="100%"
                  height="400px"
                  style={{ border: "none", borderRadius: 8 }}
                  onLoad={() => setDocumentLoading(false)}
                  title="Tài liệu bài giảng"
                />
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
        </Paper>
      </motion.div>
    </Box>
  );
}

export default LessonDetailModal;