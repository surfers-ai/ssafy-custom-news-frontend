let UUID: number = 0;

export default function useUuid() {
  const getId = () => {
    UUID++;
    return UUID.toString();
  };

  return {
    getId,
  };
}
