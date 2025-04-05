"use client";

type Props = {
  name: string;
};

const Greeting = ({ name }: Props) => {
  const now = new Date();
  const hour = now.getHours();

  let timeGreeting = "Hello";

  if (hour >= 5 && hour < 12) {
    timeGreeting = "בוקר טוב";
  } else if (hour >= 12 && hour < 17) {
    timeGreeting = "צהריים טובים";
  } else if (hour >= 17 && hour < 21) {
    timeGreeting = "ערב טוב";
  } else {
    timeGreeting = "לילה טוב";
  }

  const greeting = `${timeGreeting}, ${name} 👋`;

  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold">{greeting}</h1>
      <p className="text-muted-foreground">הנה התוכנית להיום!</p>
    </div>
  );
};

export default Greeting;
