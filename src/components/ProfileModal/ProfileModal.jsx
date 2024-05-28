import { Modal, useMantineTheme } from "@mantine/core";
import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { toast } from "react-hot-toast";
import { hideloading, showloading } from "../../redux/alertSlice.js";
import { useDispatch} from "react-redux";
function ProfileModal({ modalOpened, setModalOpened }) {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const [profileImage, setprofileImage] = useState(null);
  const [coverImage, setcoverImage] = useState(null);
  const [formData, setFormData] = useState({});

  const[userData,setuserData]=useState()
 const userId=userData?._id


 



 const getData = async () => {
    try {
      const response = await axios.get('/user',{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
      });

    
      setuserData(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData()
// eslint-disable-next-line
  }, [])



  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setprofileImage({ profile: img });
    }
  };
  const onImageChangeCover = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setcoverImage({ cover: img });
    }
  };


  // console.log(profileImage, "profileImageprofileImageprofileImage");
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  const reset = () => {
    document.getElementById("firstname").value = null;
    document.getElementById("LastName").value = null;
    document.getElementById("worksat").value = null;
    document.getElementById("livesin").value = null;
    document.getElementById("Country").value = null;
    document.getElementById("relationship").value = null;
    setprofileImage(null);
  };

  // console.log(formData, "formdaaaaaaataaaa in mosdal");

  const uploadProfile = () => {
    try {
    
     
      // console.log(profileImage, "imageimageimage");
      formData.userId = userId;
      // console.log(formData, "formDataa................................");
      const config = {
        headers: {
          "content-type": "multipart/form-data", Authorization: "Bearer " + localStorage.getItem("token")
        },
      };
      // console.log(userId,"user id judt befor azios call in lin 60")

      const response = axios.post(`/user/${userId}`, formData,config);
      reset()
      getData()
      console.log(response, "response of USERuPDATE ethi maka");
    } catch (error) {
      dispatch(hideloading());
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpened(false)
    dispatch(showloading()); 
    if (!profileImage) {
      toast.error("Please choose a file");
    }
    uploadProfile();
    dispatch(hideloading());
  };
  useEffect(() => {
    // console.log(profileImage, "useeffext image");
    setFormData({ ...formData, ...profileImage,...coverImage });
    // console.log(formData, "formData-useEffect");
    // eslint-disable-next-line
  }, [profileImage,coverImage]);

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="65%"
      opened={modalOpened}
      onClose={() => {
        setModalOpened(false);
      }}
    >
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="infoForm"
      >
        <h3>Your Info</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            id="firstname"
            onChange={handleChange}
            name="firstname"
            placeholder="First Name"
          />
          <input
            type="text"
            className="infoInput"
            id="LastName"
            onChange={handleChange}
            name="LastName"
            placeholder="Last Name"
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            id="worksat"
            onChange={handleChange}
            name="worksat"
            placeholder="Works At"
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            id="livesin"
            onChange={handleChange}
            name="livesin"
            placeholder="Lives IN"
          />
          <input
            type="text"
            className="infoInput"
            id="Country"
            onChange={handleChange}
            name="Country"
            placeholder="Country"
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            onChange={handleChange}
            placeholder="relationship status"
            id="relationship"
          />
        </div>
        <div>
          Profile Image
          <input
            type="file"
            onChange={onImageChange}
            id="profileImage"
            name="profileImage"
          />
          Cover Image
          <input type="file" onChange={onImageChangeCover} id="coverImage" name="coverImage" />
          <button type="submit" className="button infoButton">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
}
export default ProfileModal;
