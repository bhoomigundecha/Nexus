import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown';

const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
};

function ChapterContent({chapter, content}) {
    console.log('Chapter:', chapter);
    console.log('Content:', content);
    
  return (
    <div className='p-10'>
        <h2 className='font-medium text-2xl'>{chapter?.name}</h2>
        <p className='text-gray-500'>{chapter?.about}</p>
        
        {/* Video */}
        {content?.videoId && (
            <div className='flex justify-center my-6'>
                <YouTube
                    videoId={content?.videoId}
                    opts={opts}
                />
            </div>
        )}

        {/* Content */}
        <div className='mt-6'>
            {content?.content?.map((item, index) => (
                <div key={index} className='p-5 bg-purple-50 shadow-sm mb-3 rounded-lg'>
                    <h2 className='font-medium text-xl'>{item.title}</h2>
                    <ReactMarkdown className='text-lg text-black leading-9 mt-2'>
                        {item?.explanation || item?.description}
                    </ReactMarkdown>
                    {item.codeExample && (
                        <div className='p-4 bg-black text-white rounded-md mt-3 overflow-x-auto'>
                            <pre>
                                <code>{item.codeExample.replace('<precode>', '').replace('</precode>', '')}</code>
                            </pre>
                        </div>
                    )}
                </div>
            ))}
            
            {/* Fallback: Show chapter description if no detailed content */}
            {!content?.content && chapter?.about && (
                <div className='p-5 bg-purple-50 shadow-sm mb-3 rounded-lg'>
                    <h2 className='font-medium text-xl'>Chapter Overview</h2>
                    <p className='text-lg text-gray-700 leading-9 mt-2 whitespace-pre-wrap'>
                        {chapter.about}
                    </p>
                    <div className='mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded'>
                        <p className='text-sm text-blue-800'>
                            💡 Detailed chapter content will be generated when you start learning this chapter.
                        </p>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default ChapterContent