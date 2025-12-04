import { Link, useNavigate  } from "react-router-dom";
import { useState } from "react";
import './sidebar.scss'
import CustomFetch from "../utills/CustomFetch";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbSitemap } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { toast } from "react-toastify";
import { GrUserAdmin } from "react-icons/gr";
import { RiUserShared2Fill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
import { MdAddBusiness } from "react-icons/md";
const Sidebar = ({ role }) => {
  
  const navigate = useNavigate();
 const handleLogout = async () => {
    try {
      await CustomFetch.post("/user/logout");
      toast.success("Successfully logged out!");
      return navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.msg);
    }
  };
  const [open, isOpen] = useState(false)
  const sideBarOpener = (e) => {

    isOpen(!open)


  }

  return (
    <aside className={`dukan-sidebar ${open ? 'w-80' : ''}`}>
      <div className="dukan-sidebar-header">
        <div className="toggle-btn" onClick={sideBarOpener}>
          <RxHamburgerMenu />
        </div>
      </div>
      <nav className="dukan-sidebar-nav min-h-[80vh]">
        <ul>
          <li>
            <RiDashboardHorizontalLine />
            <Link to=".">Dashboard</Link>
          </li>
          <li>
            <MdProductionQuantityLimits />
            <Link to="products">Products</Link>

          </li>
   
{role === "seller" || "admin"  ? 
  <li>
    <MdAddBusiness />
    <Link to="add-product">Add-Products</Link>
  </li>
 : 
  <li className='!hidden'>{}</li>
}
          <li>
            <TbSitemap />
            <Link to="orders">Orders</Link>
          </li>
          <li>
            <MdOutlineSettings />
            <Link to="settings">Settings</Link>
          </li>
          {
            role === "admin" ?
              <li>
                <GrUserAdmin />
                <Link to="settings">Admin</Link>
              </li>
              : <li>

                <RiUserShared2Fill />

               <Link to='/'>user</Link>
                </li>



          }
        </ul>
      </nav>
      {/* ........Logout Button */}
              <button className="logout p-2 flex justify-center" onClick={handleLogout}>
             <FaPowerOff />
              </button>
        
    </aside>
  );
};

export default Sidebar;
