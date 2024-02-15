export const getRouterParamFromAsPath = (paramName: string, asPath: string) => {
  // ONLY IF THE PARAM IS THE LAST PARAM
  if (asPath?.length) {
    const paramExists = asPath.includes(paramName);
    if (paramExists) {
      const paramIndex = asPath?.indexOf(`${paramName}=`);
      const paramValue = asPath.substring(
        paramIndex + paramName?.length + 1,
        asPath?.length
      );
      return paramValue;
    } else return undefined;
  }
};
