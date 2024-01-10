import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);

  const [permition, setPermition] = useState({});

  let url = window.location.href;
  let activeLink = localStorage.getItem("activeLink") ?? "a";
  let parentLinkActive =
    activeLink.split("").length > 1 && activeLink.split("")[0];

  function changeActiveLink(link) {
    localStorage.setItem("activeLink", link);
  }

  useEffect(() => {
    let object = localStorage.getItem("ja.sjson");
    setPermition(JSON.parse(object));
  }, []);

  const LinkComponent = ({
    hasSublinks,
    children,
    link,
    thisId,
    srcImg,
    srcImgActive,
    linkTitle,
    fromParentLink,
    hidden,
  }) => {
    let parentId = parentLinkActive;

    const [open, setOpen] = useState(parentId ? true : false);

    return (
      <div className={`${hidden ? "hidden" : "visible"} w-full`}>
        <div
          onClick={() => {
            hasSublinks
              ? (setOpen(!open), changeActiveLink(thisId))
              : ((window.location.href = link), changeActiveLink(thisId));
          }}
          className={`w-full flex group h-10 gap-3 items-center hover:text-secondary px-7 my-1 cursor-pointer`}
        >
          <span className="w-6 h-6">
            <img
              className="w-full h-full object-cover"
              src={activeLink === thisId ? srcImgActive : srcImg}
              alt=""
            />
          </span>
          <p className={`text-[1rem] group-hover:text-primary w-4/6 transition ${activeLink === thisId ? "text-primary font-semibold" : "text-gray-400"}`}>{linkTitle}</p>
        </div>
      </div>
    );
  };

  return (
    <div
      className={[
        "lg:hidden block sticky h-fit w-full overflow-hidden border-b bg-white",
      ]}
    >
      <div className="w-full h-fit p-3 flex justify-between items-center">
        <div className="w-12 h-12 bg-white relative">
          <img
            src={import.meta.env.VITE_ISOTIPO_APP}
            className="my-0 mx-auto h-full box-border w-full object-contain"
          />
        </div>
        <span
          onClick={() => {
            setActiveMenu(!activeMenu);
          }}
          className="text-primary cursor-pointer text-3xl"
        >
          {activeMenu ? <FiX /> : <FiMenu />}
        </span>
      </div>
      <div className={[
        `w-full h-fit overflow-hidden relative ${activeMenu ? "flex" : "hidden"} flex-col justify-start items-center border-t`
      ]}>
        <LinkComponent
          hidden={permition["VerConfiguracionDanoDT"] === 2}
          fromParentLink=""
          linkTitle="Daños a Terceros"
          srcImgActive="/images/configuracion-ico-active.png"
          srcImg="/images/configuracion-ico.png"
          link={"/quotes"}
          hasSublinks={false}
          thisId={"ca"}
        />
        <LinkComponent
          hidden={permition["VerEmisionPoliza"] === 2}
          fromParentLink=""
          linkTitle="Emitir Póliza"
          srcImgActive="/images/emitir-ico-active.png"
          srcImg="/images/emitir-ico.png"
          link={"/issue-policy"}
          hasSublinks={false}
          thisId={"n"}
        />
        <LinkComponent fromParentLink="" linkTitle="Salir" srcImgActive="/images/salir-ico-active.png" srcImg="/images/salir-ico.png" link={"/login"} hasSublinks={false} thisId={"q"} />
      </div>
    </div>
  );
};

export default Navbar;
