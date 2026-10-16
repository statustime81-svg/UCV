import type { Lang } from "../../content/site";
import { Heading, Button } from "../../components/Ui";

export default function FirstLaunchSection({ l }: { l: Lang }) {
  return (
    <section className="section first-launch-section">
      <div data-reveal>
        <Heading
          label={
            l === "de"
              ? "UNSER ERSTER STANDORT"
              : "OUR FIRST LOCATION"
          }
          title={
            l === "de"
              ? "Unser erster Launch: Fry Rebels Buchholz."
              : "Our first launch: Fry Rebels Buchholz."
          }
          text={
            l === "de"
              ? "Mit Fry Rebels Buchholz haben wir unseren ersten Standort gestartet. Auf dieser Grundlage entwickeln wir unsere Abläufe weiter und suchen passende Restaurantpartner für die nächsten Schritte."
              : "We have launched our first location with Fry Rebels Buchholz. We are building on this experience, refining our operations, and looking for suitable restaurant partners for the next stage."
          }
        />

        <div style={{ marginTop: "24px" }}>
          <Button l={l}>
            {l === "de"
              ? "Unverbindlich anfragen"
              : "Enquire without obligation"}
          </Button>
        </div>
      </div>
    </section>
  );
}
