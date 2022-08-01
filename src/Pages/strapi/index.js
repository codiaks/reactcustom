import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Table from "components/table";

export default function App() {
  const [state, setstate] = useState({});
  const [error, setError] = useState("");
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      getInsti();
    } else {
      getF();
    }
  }, []);

  const getInsti = (params) => {
    try {
      postData("http://localhost:1337/api/institutions", { answer: 42 }).then(
        (data) => {
          let arr = [];
          data.data &&
            data.data.length > 0 &&
            data.data.forEach((element) => {
              //console.log(element);
              let o = { ...element.attributes };
              o.id = element.id;
              arr.push(o);
            });
          setstate(arr);
          //console.log(data,arr); // JSON data parsed by `data.json()` call
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const getF = async (params) => {
    const { data } = await axios.post("http://localhost:1337/api/auth/local", {
      identifier: "akhil.surya@webofficeit.com",
      password: "_rZ4_Yp..i3q@h_",
    });

    console.log(data);
    data.jwt && localStorage.setItem("token", data.jwt);
  };
  // Example POST method implementation:
  async function postData(url = "", data = {}) {
    let token = localStorage.getItem("token");

    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const onSubmit = async (params) => {
    try {
      params.preventDefault();
      const formData = params.target;

      const body = JSON.stringify({
        data: {
          Name: formData.institution_name.value,
          Description: formData.description.value,
          Address: formData.address.value,
          email: formData.emailAddress.value,
          phone: formData.phone.value,
          //Institution_Id : '123insti'
        },
      });
      console.log(body);
      let token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        "http://localhost:1337/api/institutions",
        body,
        config
      );
      console.log(data);
      if (data.status === 200) {
        setError('')
        getInsti();
        params.target.reset() 
      }
    } catch (err) {
      console.log(err);
      if(err.response) {
        setError(err.response.data.error.status + " " + err.response.data.error.name || err.response.statusText)
      }
    }
    // POST
  };

  const submit = (e) => {
    try {
      setError("false");
      const formData = new FormData(e.target);
      const user = {};
      console.log(formData.entries());

      e.preventDefault();
      let arr = [];
      for (let entry of formData.entries()) {
        console.log(entry);
        if (entry[1] === "" || entry[1] === null || entry[1] === undefined) {
          setError("true");
          return;
        }
        let vals = entry[0].split("_");
        console.log(entry);
        let key = parseInt(vals[2]);
        let filarr = arr.filter((item) => item.key === key);
        if (filarr.length > 0) {
          arr[key].to = entry[1];
        } else {
          arr.push({
            key: key,
            from: entry[1],
          });
        }
        user[entry[0]] = entry[1];
      }
      //saveMatchCases(arr);
    } catch (err) {
      console.log(err);
      setError("error");
    }
  };

  return (
    <div className="container">
      <h2 className="flex justify-center mt-10 mb-10 text-xl font-semibold">
        TEST APP
      </h2>
      
      <div className="flex justify-center mb-10">
        {" "}
        <Table
          data={state}
          columns={[
            { title: "ID", key: "id" },
            {
              title: "Name",
              key: "Name",
            },
            {
              title: "Description",
              key: "Description",
            },
            {
              title: "Email",
              key: "email",
            },
            {
              title: "phone",
              key: "phone",
            },
          ]}
        />
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mb-20">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            Institution
          </h2>
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="institution_name"
                >
                  Institution Name
                </label>
                <input
                  id="institution_name"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="emailAddress"
                >
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="address"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Save
              </button>
            </div>
          </form>
          <p className="text-orange-700	"> {error}</p>
        </section>
      </div>
    </div>
  );
}
