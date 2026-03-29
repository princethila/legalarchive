-- RPC function to increment view_count for a judgment
CREATE OR REPLACE FUNCTION increment_view_count(target_id UUID)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE judgments
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = target_id;
END;
$$;