import formdata from "form-data";
import axios from "axios";
export default function Upload() {
  return (
    <input
      type={"file"}
      multiple
      onChange={(data) => {
        const d = new formdata();
        if (data.target.files)
          for (let i = 0; i < data.target.files?.length; i++) {
            d.append("file", data.target.files[i]);
          }
        sendFile(d);
      }}
    ></input>
  );
}
const sendFile = async (data: any) => {
  await axios.post(`${process.env.API}/account/898920274945/newfile`, data, {
    withCredentials: true,
  });
};
