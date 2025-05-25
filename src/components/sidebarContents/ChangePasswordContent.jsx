const ChangePasswordContent = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Change Password</h2>
    <form className="space-y-4 max-w-sm">
      <div>
        <label className="block mb-1">Current Password</label>
        <input type="password" className="w-full border rounded p-2" />
      </div>
      <div>
        <label className="block mb-1">New Password</label>
        <input type="password" className="w-full border rounded p-2" />
      </div>
      <button className="bg-pink-600 text-white px-4 py-2 rounded">Update Password</button>
    </form>
  </div>
);

export default ChangePasswordContent;
