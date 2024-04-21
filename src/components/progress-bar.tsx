import clsx from "clsx";
import { Typography } from ".";

export function ProgressBar(props: {
  percentage: number;
  showPercentage?: boolean;
}) {
  let flooredPercentage = Math.floor(props.percentage);
  flooredPercentage = Math.max(flooredPercentage, 0);
  flooredPercentage = Math.min(flooredPercentage, 100);
  return (
    <div className="flex flex-row items-center w-full">
      <div aria-hidden className="relative h-2 w-full">
        <div className="bg-gray-200 absolute h-2 rounded w-full"></div>
        <div
          className={clsx("bg-primary-600 absolute h-2 rounded", {
            "w-[1%]": flooredPercentage <= 1,
            "w-[2%]": flooredPercentage === 2,
            "w-[3%]": flooredPercentage === 3,
            "w-[4%]": flooredPercentage === 4,
            "w-[5%]": flooredPercentage === 5,
            "w-[6%]": flooredPercentage === 6,
            "w-[7%]": flooredPercentage === 7,
            "w-[8%]": flooredPercentage === 8,
            "w-[9%]": flooredPercentage === 9,
            "w-[10%]": flooredPercentage === 10,
            "w-[11%]": flooredPercentage === 11,
            "w-[12%]": flooredPercentage === 12,
            "w-[13%]": flooredPercentage === 13,
            "w-[14%]": flooredPercentage === 14,
            "w-[15%]": flooredPercentage === 15,
            "w-[16%]": flooredPercentage === 16,
            "w-[17%]": flooredPercentage === 17,
            "w-[18%]": flooredPercentage === 18,
            "w-[19%]": flooredPercentage === 19,
            "w-[20%]": flooredPercentage === 20,
            "w-[21%]": flooredPercentage === 21,
            "w-[22%]": flooredPercentage === 22,
            "w-[23%]": flooredPercentage === 23,
            "w-[24%]": flooredPercentage === 24,
            "w-[25%]": flooredPercentage === 25,
            "w-[26%]": flooredPercentage === 26,
            "w-[27%]": flooredPercentage === 27,
            "w-[28%]": flooredPercentage === 28,
            "w-[29%]": flooredPercentage === 29,
            "w-[30%]": flooredPercentage === 30,
            "w-[31%]": flooredPercentage === 31,
            "w-[32%]": flooredPercentage === 32,
            "w-[33%]": flooredPercentage === 33,
            "w-[34%]": flooredPercentage === 34,
            "w-[35%]": flooredPercentage === 35,
            "w-[36%]": flooredPercentage === 36,
            "w-[37%]": flooredPercentage === 37,
            "w-[38%]": flooredPercentage === 38,
            "w-[39%]": flooredPercentage === 39,
            "w-[40%]": flooredPercentage === 40,
            "w-[41%]": flooredPercentage === 41,
            "w-[42%]": flooredPercentage === 42,
            "w-[43%]": flooredPercentage === 43,
            "w-[44%]": flooredPercentage === 44,
            "w-[45%]": flooredPercentage === 45,
            "w-[46%]": flooredPercentage === 46,
            "w-[47%]": flooredPercentage === 47,
            "w-[48%]": flooredPercentage === 48,
            "w-[49%]": flooredPercentage === 49,
            "w-[50%]": flooredPercentage === 50,
            "w-[51%]": flooredPercentage === 51,
            "w-[52%]": flooredPercentage === 52,
            "w-[53%]": flooredPercentage === 53,
            "w-[54%]": flooredPercentage === 54,
            "w-[55%]": flooredPercentage === 55,
            "w-[56%]": flooredPercentage === 56,
            "w-[57%]": flooredPercentage === 57,
            "w-[58%]": flooredPercentage === 58,
            "w-[59%]": flooredPercentage === 59,
            "w-[60%]": flooredPercentage === 60,
            "w-[61%]": flooredPercentage === 61,
            "w-[62%]": flooredPercentage === 62,
            "w-[63%]": flooredPercentage === 63,
            "w-[64%]": flooredPercentage === 64,
            "w-[65%]": flooredPercentage === 65,
            "w-[66%]": flooredPercentage === 66,
            "w-[67%]": flooredPercentage === 67,
            "w-[68%]": flooredPercentage === 68,
            "w-[69%]": flooredPercentage === 69,
            "w-[70%]": flooredPercentage === 70,
            "w-[71%]": flooredPercentage === 71,
            "w-[72%]": flooredPercentage === 72,
            "w-[73%]": flooredPercentage === 73,
            "w-[74%]": flooredPercentage === 74,
            "w-[75%]": flooredPercentage === 75,
            "w-[76%]": flooredPercentage === 76,
            "w-[77%]": flooredPercentage === 77,
            "w-[78%]": flooredPercentage === 78,
            "w-[79%]": flooredPercentage === 79,
            "w-[80%]": flooredPercentage === 80,
            "w-[81%]": flooredPercentage === 81,
            "w-[82%]": flooredPercentage === 82,
            "w-[83%]": flooredPercentage === 83,
            "w-[84%]": flooredPercentage === 84,
            "w-[85%]": flooredPercentage === 85,
            "w-[86%]": flooredPercentage === 86,
            "w-[87%]": flooredPercentage === 87,
            "w-[88%]": flooredPercentage === 88,
            "w-[89%]": flooredPercentage === 89,
            "w-[90%]": flooredPercentage === 90,
            "w-[91%]": flooredPercentage === 91,
            "w-[92%]": flooredPercentage === 92,
            "w-[93%]": flooredPercentage === 93,
            "w-[94%]": flooredPercentage === 94,
            "w-[95%]": flooredPercentage === 95,
            "w-[96%]": flooredPercentage === 96,
            "w-[97%]": flooredPercentage === 97,
            "w-[98%]": flooredPercentage === 98,
            "w-[99%]": flooredPercentage === 99,
            "w-full": flooredPercentage === 100,
          })}
        ></div>
      </div>
      {props.showPercentage && (
        <Typography element="p" size="s" style="bold">
          {flooredPercentage}%
        </Typography>
      )}
    </div>
  );
}
