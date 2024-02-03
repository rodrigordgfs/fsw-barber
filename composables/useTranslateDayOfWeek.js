export default function useTranslateDayOfWeek() {
  const translateDayOfWeek = (dayOfWeek) => {
    const daysOfWeek = {
      MONDAY: "Segunda-feira",
      TUESDAY: "Terça-feira",
      WEDNESDAY: "Quarta-feira",
      THURSDAY: "Quinta-feira",
      FRIDAY: "Sexta-feira",
      SATURDAY: "Sábado",
      SUNDAY: "Domingo",
    };

    return daysOfWeek[dayOfWeek] || dayOfWeek;
  };

  return { translateDayOfWeek };
}
