import React, { useState } from 'react'
import { Accordion, Icon, Placeholder } from 'semantic-ui-react'

const FAQ = ({ data }) => {
  let [activeIndex, setActiveIndex] = useState(null)

  return (
    <Accordion fluid>
      {data.map((d, i) => (
        <div
          key={i}
          style={{
            borderBottom: '1px solid rgba(34, 36, 38, 0.15)',
            padding: '.5em 0',
          }}
        >
          <Accordion.Title
            active={activeIndex === i}
            index={i}
            onClick={() =>
              activeIndex === i ? setActiveIndex(null) : setActiveIndex(i)
            }
            style={{
              display: 'flex',
              flexDirection: 'vertical',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {d.question}
            <Icon name="dropdown" />
          </Accordion.Title>
          <Accordion.Content active={activeIndex === i}>
            {d.answer === undefined ? (
              <Placeholder>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            ) : (
              <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{d.answer}</span>
            )}
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
  )
}

export default FAQ
