import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewProcessModal from "./ViewProcessModal";

const AllProcess = () => {
  const [allProcess, setAllProcess] = useState([]);
  const [modalProcess, setModalProcess] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/allprocess");
        setAllProcess(response.data.result);
      } catch (error) {
        console.error("There was an error fetching the processes!", error);
      }
    };

    fetchProcesses();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this process???"
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/allprocess/${id}`
        );
        if (response.data.status === "success") {
          setAllProcess(allProcess.filter((process) => process._id !== id));
          toast.success("Process deleted successfully!");
        }
      } catch (error) {
        console.error("There was an error deleting the process!", error);
        toast.error("There was an error deleting the process!");
      }
    }
  };

  const handleUpdateProcess = async (id) => {
    try {
      const updatedProcess = {
        name: inputRef.current.value,
        currentTime: new Date(),
      };
      const response = await axios.put(
        `http://localhost:5000/allprocess/${id}`,
        updatedProcess
      );
      if (response.data.status === "success") {
        await setAllProcess(response.data.result);
        await setModalProcess(null);
        await document.getElementById("view_process_modal").close();
        toast.success("Process updated successfully!");
      }
    } catch (error) {
      console.error("There was an error updating the process!", error);
      toast.error("There was an error updating the process!");
    }
  };

  return (
    <div>
      {allProcess.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-center underline uppercase">
                <th></th>
                <th>Name</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allProcess.map((process, i) => (
                <tr key={process._id} className="text-center">
                  <th>{i + 1}</th>
                  <td>{process.name}</td>
                  <td>{new Date(process.currentTime).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={async () => {
                        await setModalProcess(process);
                        document
                          .getElementById("view_process_modal")
                          .showModal();
                      }}
                      className="m-2 bg-blue-400 px-2 rounded-md btn-xs text-white font-bold"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(process._id);
                      }}
                      className="m-2 bg-red-400 px-2 rounded-md btn-xs text-white font-bold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No processes available</p>
      )}

      {modalProcess && (
        <ViewProcessModal
          handleUpdateProcess={handleUpdateProcess}
          modalProcess={modalProcess}
          setModalProcess={setModalProcess}
          inputRef={inputRef}
        ></ViewProcessModal>
      )}
    </div>
  );
};

export default AllProcess;
