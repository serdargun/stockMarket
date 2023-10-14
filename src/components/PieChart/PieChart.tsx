import React from 'react';
import {SafeAreaView} from 'react-native';
import {Path, Svg} from 'react-native-svg';

const getXY = (percent: number, radius: number) => {
  const x = Math.cos((2 * Math.PI * percent) / 100) * radius;
  const y = Math.sin((2 * Math.PI * percent) / 100) * radius;
  return {x, y};
};

export default function PieChart({percentages}) {
  console.log(percentages);
  const radius = 100;
  let cumulativePercent = 0;

  const pathDataList = percentages.map(v => {
    const start = getXY(cumulativePercent, radius);
    cumulativePercent += v.percent;
    const end = getXY(cumulativePercent, radius);
    const largeArcFlag = v.percent > 50 ? 1 : 0;
    return {
      d: `M ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
      L 0 0`,
      id: v.id,
      percent: v.percent,
      color: v.color,
    };
  });

  return (
    <SafeAreaView>
      <Svg
        viewBox="-50 -100 200 200"
        style={{
          height: 200,
          //transform: [{rotateZ: '-90deg'}],
        }}>
        {pathDataList.map((v, i) => {
          return <Path key={i} d={v.d} fill={v.color} />;
        })}
      </Svg>
    </SafeAreaView>
  );
}
