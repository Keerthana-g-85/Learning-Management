import { useSelector } from "react-redux";
import { ThemeContext } from "../components/Theme";
import { useContext } from "react";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

interface Courses {
  id: string;
  title: string;
  description: string;
  instructor_name: string;
  duration: string;
  thumbnail: string;
  level: string;
  price: string;
}
export default function Cart() {
  const course = useSelector((state: any) => state.cart.course);
  const { theme } = useContext(ThemeContext);
  console.log(course);
  return (
    <>
      <Box>
        <Stack spacing={3}>
          {course.map((data: Courses) => {
            
            return (
               
              <div key={data.id}>
                <Box
                  sx={{
                    display: "flex",
                    bgcolor: theme === "light" ? "#D1D8BE" : "#010102",
                    borderRadius: "20px",
                  }}
                >
                  <Box sx={{ height: "200px" }}>
                    <Card
                      sx={{
                        height: "200px",
                        width: "400px",
                        bgcolor: theme === "light" ? "#D1D8BE" : "#010102",
                        border: "none",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt=""
                        height="200"
                        sx={{ p: 1, borderRadius: 5 }}
                        image={data.thumbnail}
                      />
                    </Card>
                  </Box>

                  <Box sx={{ p: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        color: theme === "light" ? "black" : "#94a3b8",
                        fontWeight: 600,
                        fontFamily: "Outfit, sans-serif",
                        mb: 1,
                      }}
                    >
                      {data.title}
                    </Typography>
                    <Chip
                      label={data.level.toUpperCase()}
                      sx={{
                        bgcolor: theme === "light" ? "#819A91" : "#0ea5e9",

                        fontWeight: 700,
                        mb: 1,
                      }}
                    />
                    <Typography
                      sx={{
                        color: theme === "light" ? "black" : "#94a3b8",
                        fontSize: "1rem",
                        lineHeight: 1.6,
                        minHeight: 30,
                      }}
                    >
                      {data.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        mb: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          color: theme === "light" ? "black" : "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        <AttachMoneyIcon
                          sx={{
                            color: theme === "light" ? "#2b3430" : "#0ea5e9",
                          }}
                        />
                        {data.price}
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: theme === "light" ? "black" : "#94a3b8",
                        }}
                      >
                        <CoPresentIcon />
                        {data.instructor_name}
                      </Typography>

                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontWeight: 600,
                          color: theme === "light" ? "black" : "#94a3b8",
                        }}
                      >
                        <AccessTimeIcon
                          sx={{
                            color: theme === "light" ? "#2b3430" : "#0ea5e9",
                          }}
                        />
                        {data.duration}
                      </Typography>
                    </Box>

                    <Button variant="outlined" startIcon={<DeleteIcon />} 
                    sx={{ color:'white', bgcolor: theme === "light" ? "#485e56" : "#0ea5e9", borderRadius:'10px'}}>
                      Remove from cart
                    </Button>
                  </Box>
                </Box>
              </div>
            );
          })}
        </Stack>
      </Box>
    </>
  );
}
