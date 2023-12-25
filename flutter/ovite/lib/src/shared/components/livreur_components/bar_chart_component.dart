import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class BarChartComponent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1.7,
      child: BarChart(
        BarChartData(
          alignment: BarChartAlignment.spaceAround,
          maxY: 20,
          barTouchData: BarTouchData(
            enabled: false,
          ),
          titlesData: FlTitlesData(
            show: true,
            bottomTitles: SideTitles(
              showTitles: true,
              getTextStyles: (context, value) =>
                  const TextStyle(color: Colors.black, fontSize: 14),
              margin: 16,
              getTitles: (double value) {
                switch (value.toInt()) {
                  case 0:
                    return 'Lun';
                  case 1:
                    return 'Mar';
                  case 2:
                    return 'Mer';
                  case 3:
                    return 'Jeu';
                  case 4:
                    return 'Ven';
                  case 5:
                    return 'Sam';
                  case 6:
                    return 'Dim';
                  default:
                    return '';
                }
              },
            ),
            leftTitles: SideTitles(showTitles: false),
            topTitles: SideTitles(showTitles: false),
            rightTitles: SideTitles(showTitles: false),
          ),
          gridData: FlGridData(
            show: false,
          ),
          borderData: FlBorderData(
            show: false,
          ),
          barGroups: [
            BarChartGroupData(
              x: 0,
              barRods: [
                BarChartRodData(y: 8, colors: [Colors.lightBlueAccent])
              ],
            ),
            BarChartGroupData(
              x: 1,
              barRods: [
                BarChartRodData(y: 10, colors: [Colors.blueAccent])
              ],
            ),
            BarChartGroupData(
              x: 2,
              barRods: [
                BarChartRodData(y: 14, colors: [Colors.purpleAccent])
              ],
            ),
            BarChartGroupData(
              x: 3,
              barRods: [
                BarChartRodData(y: 15, colors: [Colors.pinkAccent])
              ],
            ),
            BarChartGroupData(
              x: 4,
              barRods: [
                BarChartRodData(y: 13, colors: [Colors.orangeAccent])
              ],
            ),
            BarChartGroupData(
              x: 5,
              barRods: [
                BarChartRodData(y: 10, colors: [Colors.redAccent])
              ],
            ),
            BarChartGroupData(
              x: 6,
              barRods: [
                BarChartRodData(y: 16, colors: [Colors.greenAccent])
              ],
            ),
          ],
        ),
      ),
    );
  }
}
