/*
  Este função tem objetivo de converter data no formato:
  "yyyy-mm-ddT00:00:00.000Z" => "dd/mm/yyy"
*/
export async function convertTimestampToDate(date: any) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/*
  Este função tem objetivo de converter data no formato:
  "dd/mm/yyy" => "yyyy-mm-ddT00:00:00.000Z"
*/
export async function convertDateToTimestamp(
  inputDate: string,
): Promise<Date | null> {
  const parts = inputDate.split('/');

  if (parts.length !== 3) {
    throw new Error('Invalid date format');
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    throw new Error('Invalid date format');
  }

  const dateObject = new Date(year, month - 1, day); // Month is 0-based in Date constructor

  const formattedDate = new Date(
    `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')}`,
  );

  return formattedDate;
}
