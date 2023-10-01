import axios from "axios";
import React from "react";

export const UseApi = () => {
  const getApi = async () => {
    const res = await axios.get(
      "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy"
    );
    return res.data;
  };
  return {
    getApi,
  };
};
