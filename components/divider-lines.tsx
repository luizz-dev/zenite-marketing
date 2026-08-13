//refetente ao menu mobile, apenas as linhas divisórias entre o logo e os links do menu

export function DividerLines() {
  return (
    <div className="flex flex-col gap-1 py-[20%]">
      {/* Linha superior maior */}
      <div className="mx-auto h-[2px] w-8/10 bg-gradient-to-r from-[#D9D9D9]/10 via-[#D9D9D9] to-[#D9D9D9]/10" />
      {/* Linha inferior menor e centralizada ao meio */}
      {/* <div className="mx-auto h-[2px] mt-1 w-6/10 bg-gradient-to-r from-[#D9D9D9]/10 via-[#D9D9D9] to-[#D9D9D9]/10" /> */}
    </div>
  );
}