﻿i m p o r t   R e a c t ,   {   u s e S t a t e   }   f r o m   ' r e a c t ' ; 
 i m p o r t   {   C a l e n d a r ,   X   }   f r o m   ' l u c i d e - r e a c t ' ; 
 
 t y p e   A p p o i n t m e n t M o d a l P r o p s   =   { 
     i s O p e n :   b o o l e a n ; 
     o n C l o s e :   ( )   = >   v o i d ; 
     o n S u b m i t :   ( a p p o i n t m e n t D a t a :   { 
         t y p e :   s t r i n g ; 
         d a t e :   s t r i n g ; 
         t i m e :   s t r i n g ; 
         n o t e s :   s t r i n g ; 
     } )   = >   v o i d ; 
 } ; 
 
 e x p o r t   c o n s t   A p p o i n t m e n t M o d a l   =   ( {   i s O p e n ,   o n C l o s e ,   o n S u b m i t   } :   A p p o i n t m e n t M o d a l P r o p s )   = >   { 
     c o n s t   [ a p p o i n t m e n t D a t a ,   s e t A p p o i n t m e n t D a t a ]   =   u s e S t a t e ( { 
         t y p e :   ' I n i t i a l   C o n s u l t a t i o n ' , 
         d a t e :   ' ' , 
         t i m e :   ' ' , 
         n o t e s :   ' ' 
     } ) ; 
 
     i f   ( ! i s O p e n )   r e t u r n   n u l l ; 
 
     c o n s t   h a n d l e S u b m i t   =   ( e :   R e a c t . F o r m E v e n t )   = >   { 
         e . p r e v e n t D e f a u l t ( ) ; 
         o n S u b m i t ( a p p o i n t m e n t D a t a ) ; 
         s e t A p p o i n t m e n t D a t a ( { 
             t y p e :   ' I n i t i a l   C o n s u l t a t i o n ' , 
             d a t e :   ' ' , 
             t i m e :   ' ' , 
             n o t e s :   ' ' 
         } ) ; 
     } ; 
 
     r e t u r n   ( 
         < d i v   c l a s s N a m e = " f i x e d   i n s e t - 0   b g - b l a c k / 5 0   f l e x   i t e m s - c e n t e r   j u s t i f y - c e n t e r   p - 4 " > 
             < d i v   c l a s s N a m e = " b g - g r a y - 8 0 0   r o u n d e d   p - 4   m a x - w - m d   w - f u l l " > 
                 < d i v   c l a s s N a m e = " f l e x   j u s t i f y - b e t w e e n   i t e m s - c e n t e r   m b - 4 " > 
                     < h 3   c l a s s N a m e = " t e x t - l g   f o n t - m e d i u m " > S c h e d u l e   A p p o i n t m e n t < / h 3 > 
                     < b u t t o n   o n C l i c k = { o n C l o s e }   c l a s s N a m e = " t e x t - g r a y - 4 0 0   h o v e r : t e x t - g r a y - 3 0 0 " > 
                         < X   c l a s s N a m e = " w - 5   h - 5 "   / > 
                     < / b u t t o n > 
                 < / d i v > 
 
                 < f o r m   o n S u b m i t = { h a n d l e S u b m i t }   c l a s s N a m e = " s p a c e - y - 4 " > 
                     < d i v > 
                         < l a b e l   c l a s s N a m e = " t e x t - s m   t e x t - g r a y - 4 0 0   b l o c k   m b - 1 " > T y p e < / l a b e l > 
                         < s e l e c t   
                             v a l u e = { a p p o i n t m e n t D a t a . t y p e } 
                             o n C h a n g e = { ( e )   = >   s e t A p p o i n t m e n t D a t a ( p r e v   = >   ( {   . . . p r e v ,   t y p e :   e . t a r g e t . v a l u e   } ) ) } 
                             c l a s s N a m e = " w - f u l l   b g - g r a y - 7 0 0   r o u n d e d   p x - 3   p y - 2   t e x t - s m " 
                         > 
                             < o p t i o n > I n i t i a l   C o n s u l t a t i o n < / o p t i o n > 
                             < o p t i o n > F o l l o w - u p < / o p t i o n > 
                             < o p t i o n > P i c k u p < / o p t i o n > 
                             < o p t i o n > D r o p   O f f < / o p t i o n > 
                             < o p t i o n > S e r v i c e < / o p t i o n > 
                         < / s e l e c t > 
                     < / d i v > 
 
                     < d i v   c l a s s N a m e = " g r i d   g r i d - c o l s - 2   g a p - 4 " > 
                         < d i v > 
                             < l a b e l   c l a s s N a m e = " t e x t - s m   t e x t - g r a y - 4 0 0   b l o c k   m b - 1 " > D a t e < / l a b e l > 
                             < i n p u t   
                                 t y p e = " d a t e " 
                                 v a l u e = { a p p o i n t m e n t D a t a . d a t e } 
                                 o n C h a n g e = { ( e )   = >   s e t A p p o i n t m e n t D a t a ( p r e v   = >   ( {   . . . p r e v ,   d a t e :   e . t a r g e t . v a l u e   } ) ) } 
                                 c l a s s N a m e = " w - f u l l   b g - g r a y - 7 0 0   r o u n d e d   p x - 3   p y - 2   t e x t - s m " 
                             / > 
                         < / d i v > 
                         < d i v > 
                             < l a b e l   c l a s s N a m e = " t e x t - s m   t e x t - g r a y - 4 0 0   b l o c k   m b - 1 " > T i m e < / l a b e l > 
                             < i n p u t   
                                 t y p e = " t i m e " 
                                 v a l u e = { a p p o i n t m e n t D a t a . t i m e } 
                                 o n C h a n g e = { ( e )   = >   s e t A p p o i n t m e n t D a t a ( p r e v   = >   ( {   . . . p r e v ,   t i m e :   e . t a r g e t . v a l u e   } ) ) } 
                                 c l a s s N a m e = " w - f u l l   b g - g r a y - 7 0 0   r o u n d e d   p x - 3   p y - 2   t e x t - s m " 
                             / > 
                         < / d i v > 
                     < / d i v > 
 
                     < d i v > 
                         < l a b e l   c l a s s N a m e = " t e x t - s m   t e x t - g r a y - 4 0 0   b l o c k   m b - 1 " > N o t e s < / l a b e l > 
                         < t e x t a r e a 
                             v a l u e = { a p p o i n t m e n t D a t a . n o t e s } 
                             o n C h a n g e = { ( e )   = >   s e t A p p o i n t m e n t D a t a ( p r e v   = >   ( {   . . . p r e v ,   n o t e s :   e . t a r g e t . v a l u e   } ) ) } 
                             c l a s s N a m e = " w - f u l l   b g - g r a y - 7 0 0   r o u n d e d   p x - 3   p y - 2   t e x t - s m   h - 2 4 " 
                             p l a c e h o l d e r = " A d d   a n y   s p e c i a l   i n s t r u c t i o n s   o r   n o t e s . . . " 
                         / > 
                     < / d i v > 
 
                     < d i v   c l a s s N a m e = " f l e x   j u s t i f y - e n d   g a p - 2   p t - 2 " > 
                         < b u t t o n   
                             t y p e = " b u t t o n " 
                             o n C l i c k = { o n C l o s e } 
                             c l a s s N a m e = " b g - g r a y - 7 0 0   t e x t - w h i t e   p x - 4   p y - 2   r o u n d e d   h o v e r : b g - g r a y - 6 0 0 " 
                         > 
                             C a n c e l 
                         < / b u t t o n > 
                         < b u t t o n   
                             t y p e = " s u b m i t " 
                             d i s a b l e d = { ! a p p o i n t m e n t D a t a . d a t e   | |   ! a p p o i n t m e n t D a t a . t i m e } 
                             c l a s s N a m e = " b g - b l u e - 5 0 0   t e x t - w h i t e   p x - 4   p y - 2   r o u n d e d   h o v e r : b g - b l u e - 6 0 0 
                                               d i s a b l e d : b g - g r a y - 6 0 0   d i s a b l e d : c u r s o r - n o t - a l l o w e d " 
                         > 
                             S c h e d u l e 
                         < / b u t t o n > 
                     < / d i v > 
                 < / f o r m > 
             < / d i v > 
         < / d i v > 
     ) ; 
 } ; 
 
 e x p o r t   d e f a u l t   A p p o i n t m e n t M o d a l ; 


