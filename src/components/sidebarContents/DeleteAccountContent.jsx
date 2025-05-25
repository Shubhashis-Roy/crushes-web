const DeleteAccountContent = () => (
  <div>
    <h2 className="text-xl font-semibold text-red-600 mb-4">Delete Account</h2>
    <p className="text-red-500">This action is irreversible. Are you sure you want to delete your account?</p>
    <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Yes, Delete</button>
  </div>
);

export default DeleteAccountContent;
