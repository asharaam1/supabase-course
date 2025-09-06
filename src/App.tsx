import { ChangeEvent, useEffect, useState } from "react";
import { supabase } from "./supabase-client";
import { Session } from "@supabase/supabase-js";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
  image_url: string;
}

function TaskManager({ session }: { session: Session }) {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newDescription, setNewDescription] = useState("");

  const [taskImage, setTaskImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error reading task: ", error.message);
      return;
    }

    setTasks(data);
  };

  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task: ", error.message);
      return;
    }
  };

  const updateTask = async (id: number) => {
    const { error } = await supabase
      .from("tasks")
      .update({ description: newDescription })
      .eq("id", id);

    if (error) {
      console.error("Error updating task: ", error.message);
      return;
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const filePath = `${file.name}-${Date.now()}`;

    console.log(`Uploading file: ${file.name}, size: ${file.size} bytes`);

    const { error } = await supabase.storage
      .from("tasks-images")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error.message);
      alert(`Upload failed: ${error.message}`);
      return null;
    }

    const { data } = await supabase.storage
      .from("tasks-images")
      .getPublicUrl(filePath);

    console.log(`Upload successful, public URL: ${data.publicUrl}`);
    alert("Image uploaded successfully!");
    return data.publicUrl;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsUploading(true);

    let imageUrl: string = "";
    if (taskImage) {
      const uploadedUrl = await uploadImage(taskImage);
      if (!uploadedUrl) {
        alert("Image upload failed. Task not added.");
        setIsUploading(false);
        return;
      }
      imageUrl = uploadedUrl;
    }

    console.log("Inserting task:", { ...newTask, image_url: imageUrl });

    const { error, data } = await supabase
      .from("tasks")
      .insert({ ...newTask, image_url: imageUrl })
      .select()
      .single();

    if (error) {
      console.error("Error adding task: ", error.message);
      alert(`Error adding task: ${error.message}`);
      setIsUploading(false);
      return;
    }

    console.log("Task inserted successfully:", data);

    setNewTask({ title: "", description: "" });
    setTaskImage(null);
    setIsUploading(false);
    alert("Task added successfully!");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("File size exceeds 5MB. Please choose a smaller image.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      setTaskImage(file);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const channel = supabase.channel("tasks-channel");
    channel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tasks" },
        (payload) => {
          const newTask = payload.new as Task;
          setTasks((prev) => [...prev, newTask]);
        }
      )
      .subscribe((status) => {
        console.log("Subscription: ", status);
      });
  }, []);

  console.log(tasks);

  return (
    <div
      style={{
        maxWidth: "90%",
        margin: "0 auto",
        padding: "1rem",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#2c3e50",
          marginBottom: "1.5rem",
        }}
      >
        Task Manager
      </h2>

      {/* Form to add a new task */}
      <div
        style={{
          border: "2px solid black",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "1rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, title: e.target.value }))
            }
            style={{
              width: "100%",
              marginBottom: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
          <textarea
            placeholder="Task Description"
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
            style={{
              width: "100%",
              marginBottom: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              minHeight: "80px",
              resize: "vertical",
              boxSizing: "border-box",
              padding: "0.5rem",
            }}
          />

          <input type="file" accept="image/*" onChange={handleFileChange} />

          <button
            type="submit"
            disabled={isUploading}
            style={{ padding: "0.5rem 1rem" }}
          >
            {isUploading ? "Adding Task..." : "Add Task"}
          </button>
        </form>
      </div>
      {/* List of Tasks */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, key) => (
          <li
            key={key}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              {task.image_url && (
                <img
                  src={task.image_url}
                  alt="Task image"
                  style={{ height: 70 }}
                />
              )}
              <div>
                <textarea
                  placeholder="Updated description..."
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <button
                  style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
                  onClick={() => updateTask(task.id)}
                >
                  Edit
                </button>
                <button
                  style={{ padding: "0.5rem 1rem" }}
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
