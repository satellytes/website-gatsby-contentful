import React from 'react'
import {ContactForm} from './../contact-form/contact-form';
import Events from './../events/events';
import { Content, Section, Grid, Column } from '../layout/layout';
import Copy from '../typography/copy';
import { HeadlineContent } from '../typography/headline';

const SectionContact = ({events}) => (
  <Content>
    <Section breakout>
      <Grid>
        <Column>
          <HeadlineContent>Kontakt</HeadlineContent>
          <Copy>Nutzen Sie unser Kontaktformular oder schreiben Sie uns eine E-Mail: </Copy>
          <ContactForm/>
        </Column>
        <Column>
          <HeadlineContent>Events</HeadlineContent>
          <Copy>Wir lieben es, Neues zu entdecken und neue Kontakte zu knüpfen. Dort sind wir demnächst:</Copy>
          <Events/>
          <Copy>Sie haben ein Event für uns, das wir nicht verpassen sollten?  Oder Sie hätten gerne, dass wir auf Ihrem einen Vortrag halten? Machen wir gerne.
            Schreiben Sie uns.</Copy>
        </Column>
      </Grid>
    </Section>
  </Content>
)

export default SectionContact;