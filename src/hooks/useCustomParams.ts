import { useSearchParams } from "react-router-dom";

export interface IAppProps {}

export const useCustomParams = () => {
  const [urlParams, setParams] = useSearchParams();
  const params = Object.fromEntries([...urlParams]);

  return { params, setParams };
};
