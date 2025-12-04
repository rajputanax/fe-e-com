import './PageStyles/Dashboard.scss'

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <div className="container">
        <h2 className="dashboard-title">Dashboard Overview</h2>

        {/* ====== Top Stats ====== */}
        <div className="stats-grid">
          <div className="card">
            <h3>Total Users</h3>
            <p>1,245</p>
          </div>
          <div className="card">
            <h3>Active Orders</h3>
            <p>342</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>$12,580</p>
          </div>
          <div className="card">
            <h3>Pending Tasks</h3>
            <p>8</p>
          </div>
        </div>

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
