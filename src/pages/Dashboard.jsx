import './PageStyles/Dashboard.scss'
import { useLoaderData } from "react-router";
import CustomFetch from '../utills/CustomFetch.js'
import {useEffect , useState} from 'react'
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { SiMaterialdesignicons } from "react-icons/si";
export const loader = async ()=>{
     try{
       const { data } = await CustomFetch.get('/admin/stats');
    toast.success("Dashboard loaded successfully");
    return data;
     }catch(err){
console.log(err)
     }
}


const Dashboard = ({user}) => {
  const stats = useLoaderData();
  const [statistics , setStatistics] = useState(null)



 useEffect(()=>{
const fetch = async()=>{
  try{
  const { data } = await CustomFetch.get('/admin/admin-dashboard');
 
  
  return setStatistics(data)
  }catch(err){
    console.error(err)
  }
}
fetch()
 },[])

  return (
    <div className="dashboard-layout">
      <div className="container">
        <h2 className="dashboard-title">Dashboard Overview</h2>
{stats && (

<>
        <div className="stats-grid">
          <div className="card flex flex-col justify-center items-center">
            <div className="border rounded-[50%] p-4 hover:shadow-sm transition w-[200px] h-[200px] flex flex-col justify-center items-center shadow-md">
<FaUserCircle  size='30' className='mb-[20px]'/>
            <h3>Total Users</h3>
            <p>{stats?.data?.totalUsers || "text" } </p>
            </div>
          </div>
          <div className="card flex flex-col justify-center items-center">
            <div className='border rounded-[50%] p-4 hover:shadow-sm transition w-[200px] h-[200px] flex flex-col justify-center items-center shadow-md'>
<SiMaterialdesignicons size='30' className='mb-[20px]'/>
            <h3>Available Products </h3>
            <p>{stats?.data?.totalProducts || "text" } </p>
            </div>
          </div>
          {/* <div className="card">
            <h3>Revenue</h3>
            <p>$12,580</p>
          </div> */}
          {/* <div className="card">
            <h3>Pending Tasks</h3>
            <p>8</p>
          </div> */}
        </div>

</>

)}

{
 <div className="bg-white rounded-xl shadow-md p-6 space-y-6 flex-col-100 mb-10 h-100">

  <div className="">
    <div className="bg-gray-100 rounded-lg p-4 text-center">
      <p className="text-sm text-gray-500">Total Sellers</p>
      <p className="text-2xl font-semibold text-gray-900">
        {statistics?.data?.totalSellers}
      </p>
    </div>

   
  </div>


  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Seller Products
    </h3>

    <div className="space-y-4 hover:shadow-sm transition grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 min-h-[450px]">
      {statistics?.data?.sellerProducts.map((x, i) => (
        <div
          key={i}
          className="border rounded-lg p-4 hover:shadow-sm transition"
        >
          <p className="font-medium text-gray-800">
            Seller: <span className="text-blue-600">{x.sellerName}</span>
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {x.products.map((y, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
              >
                {y.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
}



        {/* ====== Top Stats ====== */}

        {/* ====== Recent Activity ====== */}
        <div className="recent-activity">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1001</td>
                <td>John Doe</td>
                <td>Completed</td>
                <td>$120</td>
              </tr>
              <tr>
                <td>#1002</td>
                <td>Jane Smith</td>
                <td>Pending</td>
                <td>$85</td>
              </tr>
              <tr>
                <td>#1003</td>
                <td>Mark Wilson</td>
                <td>Cancelled</td>
                <td>$0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
