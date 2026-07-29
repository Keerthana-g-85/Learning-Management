import { useDispatch, useSelector } from "react-redux";
import { removeCourse } from "../redux/CartSlice";
import { ThemeContext } from "../components/Theme";
import { useContext, useState, useEffect } from "react";
import useApi from "../components/Api";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import { cartCourse } from "../redux/CartSlice";
import { getMessage } from "../redux/MessageSlice";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import emptyCart from "../assets/emptyCart.png";
import emptyCartdark from "../assets/emptyCart2.png";
import { useNavigate } from "react-router";

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
  const [open, setOpen] = useState<string>("");
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.login.user);
  const course = useSelector((state: any) => state.cart.course);
  const { theme } = useContext(ThemeContext);
  const { Api } = useApi();
  const nav = useNavigate();
  console.log(course);

  const totalPrice = course?.reduce(
    (sum: number, item: Courses) => sum + item.price,
    0,
  );
  console.log(totalPrice);

  async function getCart() {
    try {
      const response = await Api({
        method: "get",
        endpoint: `cart/get/${user.id}`,
      });
      console.log("hello cart data", response);
      console.log("data", response.data);
      dispatch(cartCourse(response.data.courses));
      dispatch(getMessage(response.data.message));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCart();
  }, []);

  async function handleDelete(id: string) {
    console.log(id);
    const response = await Api({
      method: "delete",
      endpoint: `cart/delete/${id}/${user.id}`,
    });
    console.log(response);
    dispatch(removeCourse(open));
    setOpen("");
  }

  async function handleCheckout() {
    const response = await Api({
      method: "delete",
      endpoint: `cart/clearcart/${user.id}`,
    });
    console.log(response);
    getCart();
  }
  return (
    <>
      {course.length === 0 ? (
        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              backgroundImage:
                theme === "light"
                  ? `url(${emptyCart})`
                  : `url(${emptyCartdark})`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "200px",
              height: "200px",
            }}
          ></Box>

          <Typography variant="h3">Start your learning journey</Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              px: 4,
              borderRadius: 3,
              bgcolor: theme === "light" ? "#5b7554" : "#0f172a",
            }}
            onClick={() => {
              nav("/courses");
            }}
          >
            Go to Courses
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            bgcolor: theme === "light" ? "#dee5cc" :  "#f0e0fb",
            minHeight: "100vh",
            p: 4,
          }}
        >
          <Stack spacing={3}>
            {course.map((data: Courses) => {
              return (
                <div key={data.id}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      p: 2,
                      borderRadius: 4,
                      bgcolor: theme === "light" ? "#D1D8BE" : "#1e293b",
                      boxShadow: 4,
                    }}
                  >
                    <Box sx={{ height: "200px" }}>
                      <Card
                        sx={{
                          height: "200px",
                          width: "400px",
                          bgcolor: theme === "light" ? "#D1D8BE" : "#6e88c4",
                          border: "none",
                        }}
                      >
                        <CardMedia
                          component="img"
                          alt=""
                          height="200"
                          sx={{
                            height: 220,
                            objectFit: "cover",
                          }}
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

                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        sx={{
                          color: "white",
                          bgcolor: theme === "light" ? "#485e56" : "#0ea5e9",
                          borderRadius: "10px",
                        }}
                        onClick={() => setOpen(data.id)}
                      >
                        Remove from cart
                      </Button>
                    </Box>
                  </Box>
                </div>
              );
            })}
          </Stack>

          <Box
            sx={{
              bottom: 20,
              mt: 4,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: 8,
                bgcolor: theme === "light" ? "#e3eccd" : "#6e88c4",
              }}
            >
              <Typography>Total Amount : ${totalPrice}</Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.3,
                  borderRadius: 3,
                  bgcolor: theme === "light" ? "#485e56" : "#19284e",
                }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Card>
          </Box>
        </Box>
      )}
      <Dialog open={Boolean(open)} onClose={() => setOpen("")}>
        <DialogTitle>Remove Course from Cart</DialogTitle>
        <DialogContent>
          <DialogContentText>
            "Are you sure you want to Remove course"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen("")}
            sx={{ bgcolor:  "#323334" , color: "white" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{
            bgcolor: theme==='light' ? "#2f462d" :"#3fbdef",
              display: "flex",
              border: "1px solid #75988c",
            }}
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(open)}
          >
            "Remove"
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
