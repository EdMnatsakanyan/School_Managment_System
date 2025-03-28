import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./components/homePage";
import Layout from "./components/layout";
import Classes from "./components/classes";
import Teachers from "./components/teachers";
import Pupils from "./components/pupils";
import Teacher from "./components/teachers/teacher";
import AddTeacher from "./components/teachers/addTeacher";
import Class from "./components/classes/class";
import Pupil from "./components/pupils/pupil";
import Subjects from "./components/subjects";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {path: "/", element: <HomePage />},

            {path: "/classes", element: <Classes />,},
            {path: "/classes/:id", element: <Class />},

            {path: '/teacher/:id', element: <Teacher/>},
            {path: '/teachers/add', element: <AddTeacher/>},
            {path: "/teachers", element: <Teachers/>},

            {path: "/pupils", element: <Pupils/>},
            {path: "/pupils/:id", element: <Pupil/>},

            {path: "/subjects", element: <Subjects/>}
        ]
    }
])

export default routes