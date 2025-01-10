// import axios from "axios";
// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
  //   const [menu, setMenu] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     axios.get(`${import.meta.env.VITE_URL}/menu`).then((res) => {
  //       setMenu(res.data);
  //       setLoading(false);
  //     });
  //   }, [menu]);
  //   return [menu, loading];
  const axiosPublic = useAxiosPublic();
  const {
    data: menu = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosPublic.get("/menu");
      return res.data;
    },
  });
  return [menu, loading, refetch];
};

export default useMenu;
