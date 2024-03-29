import { Box, Card, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import FlexBox from "../../FlexBox";
import { H5 } from "../../Typography";
import { FC } from "react";
import Chart from "react-apexcharts";
import AnalyticsPopover from "./AnalyticsPopover";

const data = {
  series: [99, 89, 85],
  categories: ["Livraison", "Commandes", "Retour"],
};

const Analytics: FC = () => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: { background: "transparent" },
    colors: [theme.palette.primary.main, "#FF9777", "#FF6B93"],
    labels: ["Livré", "Commandes", "Retour"],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { show: false },
          value: { show: false },
        },
        hollow: { size: "28%" },
        track: {
          background: theme.palette.divider,
          margin: 12,
        },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    legend: {
      show: true,
      position: "bottom",
      fontFamily: "inherit",
      fontSize: "13px",
      fontWeight: 500,
      onItemClick: { toggleDataSeries: false },
      onItemHover: { highlightDataSeries: true },
    },
    tooltip: {
      enabled: true,
      style: { fontFamily: "inherit" },
      y: {
        formatter: (value) => `$${value}`,
      },
    },
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
  };

  const chartSeries = data.series;
  return (
    <Card
      sx={{
        padding: "2rem",
        height: "100%",
        [theme.breakpoints.down(425)]: { padding: "1.5rem" },
      }}
    >
      <FlexBox alignItems="center" justifyContent="space-between">
        <H5> % Taux de Réussite des Livraisons</H5>
        <AnalyticsPopover />
      </FlexBox>

      <Box
        sx={{
          paddingTop: 2,
          "& .apexcharts-tooltip": {
            boxShadow: "none",
            "& .apexcharts-active": { paddingBottom: 0 },
            "&.apexcharts-theme-light": {
              border: "none",
              color: "white",
              borderRadius: "8px",
            },
          },
          "& .apexcharts-legend.position-bottom.apexcharts-align-center, .apexcharts-legend.position-top.apexcharts-align-center":
            { justifyContent: "space-evenly" },
          [theme.breakpoints.down(425)]: { padding: 0 },
        }}
      >
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="radialBar"
          height={300}
        />
      </Box>
    </Card>
  );
};

// les calls api seront à rajouter pour les charts 

export default Analytics;
