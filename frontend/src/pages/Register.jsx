const colors = {
  primary: "#060606",
  background: "#E0E0E0",
  disabled: "#D9D9D9",
};

export default function Register() {
  return (
    <div className=" flex items-start py-20 px-20 gap-20 justify-center">
      <div className="w-1/2  bg-[#F5F5F5] rounded-xl flex flex-col p-16 justify-between items-center">
        <div className="w-full flex flex-col  max-w-[500px] ">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-2xl font-semibold mb-2">SigUp</h3>
            <p className="text-sm mb-2">
              Kami menghormati privasi Anda. Informasi yang Anda berikan hanya
              akan digunakan untuk keperluan akun Anda
            </p>
          </div>

          <div className="w-full flex flex-col">
            <input
              type="text"
              placeholder="Nama"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
            <input
              type="text"
              placeholder="Alamat"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
            <input
              type="number"
              placeholder="No Handphone"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-start">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <p className="text-sm">
                Dengan mendaftar, Anda menyetujui{" "}
                <span className="font-semibold underline underline-offset-2 cursor-pointer">
                  Kebijakan Privasi
                </span>{" "}
                dan{" "}
                <span className="font-semibold underline underline-offset-2 cursor-pointer">
                  Syarat & Ketentuan
                </span>{" "}
                kami.
              </p>
            </div>

            {/* <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
              Forgot Password ?
            </p> */}
          </div>

          <div className="w-full flex flex-col my-4">
            <button className="w-full bg-[#171313] font-semibold rounded-md my-2 p-4 text-center flex items-center justify-center text-white cursor-pointer">
              Simpan
            </button>
            <button className="w-full text-[#060606] font-semibold bg-white border border-black rounded-md my-2 p-4 text-center flex items-center justify-center cursor-pointer">
              Batal
            </button>
          </div>

          {/* <div className="w-full flex items-center justify-center relative py-2 ">
            <div className="w-full h-[1px] bg-black"></div>
            <p className="text-lg absolute text-black/80 bg-[#F5F5F5]">or</p>
          </div> */}

          {/* <div className="w-full text-[#060606] font-semibold bg-white border border-black/40 rounded-md my-2 p-4 text-center flex items-center justify-center cursor-pointer ">
            <img src="/logo-google.png" className=" h-6 mr-2" />
            Sign In with Google
          </div> */}
        </div>

        {/* <div className="w-full flex items-start justify-center ">
          <p className="text-sm font-normal text-[#060606]">
            Dont have a account?{" "}
            <span className="font-semibold underline underline-offset-2 cursor-pointer">
              Sign Up for free
            </span>
          </p>
        </div> */}
      </div>

      <div className="relative w-1/2 h-full flex flex-col  py-28">
        <div className="absolute top-[25%] left-[10%] flex flex-col"></div>

        <img
          src="./undraw_sign_up_n6im.svg"
          className="max-w-[600px]  object-cover"
        />
      </div>
    </div>
  );
}
