import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useDispatch } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { hideloading, showloading } from "../../redux/alertSlice";
import Pagination from "./Pagination/Pagination";
import toast from "react-hot-toast";
import axios from "../../axios/axios";


function AdminUserlist() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [currentUserListPage, setCurrentUserListPage] = useState(1);
  const usersPerPage = 2;
  const index=currentUserListPage *usersPerPage-1
  const indexofLastUserInPage = currentUserListPage * usersPerPage;
  const indexofFirstUserInPage = indexofLastUserInPage - usersPerPage;

  const currentUserList = users.slice(
    indexofFirstUserInPage,
    indexofLastUserInPage
  );

  const userPaginate = (pageNumber) => {
    setCurrentUserListPage(pageNumber);
  };

  const handleUserStatus = async (id) => {
    try {
      dispatch(showloading());
      const response = await axios.put(`/admin/userStatusChange/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      });
      dispatch(hideloading());
      if (response.data.status) {
        localStorage.removeItem("token");
        setUsers((users) =>
          users?.map((user) => {
            if (user._id === id) {
              return {
                ...user,
                isBlocked: response.data.data.isBlocked ? true : false,
              };
            }
            return user;
          })
        );
      }
    } catch (error) {
      dispatch(hideloading());
      console.log(error);
      toast.error(error.response.data.message);
    }
  };


  useEffect(() => {
    (async () => {
      try {
        dispatch(showloading());
        const response = await axios.get("admin/getusers", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("adminToken"),
          },
        });
        dispatch(hideloading());
        if (response.data.status) {
          setUsers(response.data.data);
        } else {
          console.log(response);
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideloading());
        console.log(error);
        toast.error(error.response.data.message);
      }
    })();
    // eslint-disable-next-line
  },[]);

  return (
    <AdminLayout>
      <div>
        <h3>User list</h3>
        <div className="userRow row">
          <span className="col-1">
            <b>Sl.No</b>
          </span>
          <span className="col-2">
            <b>Username</b>
          </span>
          <span className="col-2">
            <b>Status</b>
          </span>
          <span className="col-2">
            <b>Email</b>
          </span>
        </div>

        {currentUserList?.map((user, id) => {
          return (
            <div className="userRow row" key={id}>
              <span className="col-1">{ index+id}</span>

              <span className="col-2">{user?.username}</span>
              <span className="col-2">
                {user?.isBlocked ? "Blocked" : "Active"}
              </span>
              <span className="col-2">{user?.email}</span>
              <span
                className="col-2 ms-5"
                style={{ cursor: "pointer" }}
                onClick={() => handleUserStatus(user?._id)}
              >
                {user?.isBlocked ? (
                  <PersonIcon style={{ color: "green" }} />
                ) : (
                  <PersonOffIcon style={{ color: "red" }} />
                )}
              </span>
            </div>
          );
        })}
        <Pagination
          usersPerPage={usersPerPage}
          totalPersons={users.length}
          paginate={userPaginate}
        />
      </div>
    </AdminLayout>
  );
}

export default AdminUserlist;
