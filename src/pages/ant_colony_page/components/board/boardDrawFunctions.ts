import ACity from '../../../../common/interfaces/ACity';

export function drawLine(x1: number, y1: number, x2: number, y2: number, context: CanvasRenderingContext2D): void {
  context.beginPath();
  context.moveTo(x1 + 20, y1 + 40);
  context.lineTo(x2 + 20, y2 + 40);
  context.stroke();
}
export function clearReturnContext(): CanvasRenderingContext2D | null {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (canvas) {
    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      return context;
    }
  }
  return null;
}
export function drawLines(dataList: ACity[]): void {
  const context = clearReturnContext();
  if (context) {
    context.strokeStyle = 'red';
    context.lineWidth = 3;
    context.lineCap = 'round';
    context.setLineDash([30, 30]);
    dataList.forEach((e1) => {
      dataList.forEach((e2) => {
        if (e1 !== e2) drawLine(e1.x, e1.y, e2.x, e2.y, context);
      });
    });
  }
}

export async function drawShortestPath(dataList: ACity[], bestPath: number[]): Promise<void> {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (canvas) {
    const context = canvas.getContext('2d');
    if (context) {
      setTimeout(() => {
        clearReturnContext();
        if (context) {
          context.strokeStyle = 'blue';
          context.lineWidth = 4;
          context.lineCap = 'round';
          context.setLineDash([0]);
          context.beginPath();
          context.moveTo(dataList[bestPath[0]].x, dataList[bestPath[0]].y);
          for (let i = 0; i < bestPath.length - 1; i++) {
            drawLine(
              dataList[bestPath[i]].x,
              dataList[bestPath[i]].y,
              dataList[bestPath[i + 1]].x,
              dataList[bestPath[i + 1]].y,
              context
            );
          }
        }
      }, 3000);
    }
  }
}
