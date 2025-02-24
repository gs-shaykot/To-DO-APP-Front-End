import { useContext } from "react";
import DragAndDrop from "../Components/DragAndDrop";
import { ThemeContext } from "../Provider/ThemeProvider";

const HomePage = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={`${theme === 'light' ? "bg-[#111827] text-white" : "bg-gray-100 text-black"}  pt-24  h-auto`}>
            <DragAndDrop />
        </div>
    );
};

export default HomePage;